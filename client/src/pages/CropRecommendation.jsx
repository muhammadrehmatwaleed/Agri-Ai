import { useState } from "react";
import { recommendCrop } from "../services/cropService";
import { getWeather } from "../services/weatherService";

function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    city: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "city" ? value : Number(value),
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult("");
    setWeatherInfo(null);

    try {
      // Get weather data
      const weather = await getWeather(formData.city);
      setWeatherInfo(weather);

      // Prepare crop data
      const cropData = {
        nitrogen: formData.nitrogen,
        phosphorus: formData.phosphorus,
        potassium: formData.potassium,
        ph: formData.ph,
        temperature: weather.main.temp,
        humidity: weather.main.humidity,
        rainfall: 100, // Temporary value
      };

      // Get crop recommendation
      const data = await recommendCrop(cropData);

      setResult(data.recommendation);

      setFormData({
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      ph: "",
      city: "",
    });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to get recommendation");
    } finally {
      // Always stop loading
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌾 Crop Recommendation
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="number"
          name="nitrogen"
          placeholder="Nitrogen"
          value={formData.nitrogen}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="phosphorus"
          placeholder="Phosphorus"
          value={formData.phosphorus}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="potassium"
          placeholder="Potassium"
          value={formData.potassium}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          step="0.1"
          name="ph"
          placeholder="Soil pH"
          value={formData.ph}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Recommend Crop"}
        </button>

      </form>

      {result && (
        <div className="mt-6 bg-green-100 p-4 rounded-lg text-center shadow">
          <h2 className="text-xl font-bold text-green-700">
            🌱 Recommended Crop
          </h2>

          <p className="text-2xl font-bold mt-3 text-green-800">
            {result}
          </p>
        </div>
      )}
      {weatherInfo && (
  <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold text-blue-700 mb-3">
      🌤 Weather Information
    </h2>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="font-semibold">📍 City</p>
        <p>{weatherInfo.name}</p>
      </div>

      <div>
        <p className="font-semibold">🌡 Temperature</p>
        <p>{weatherInfo.main.temp} °C</p>
      </div>

      <div>
        <p className="font-semibold">💧 Humidity</p>
        <p>{weatherInfo.main.humidity}%</p>
      </div>

      <div>
        <p className="font-semibold">🌥 Condition</p>
        <p>{weatherInfo.weather[0].main}</p>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default CropRecommendation;