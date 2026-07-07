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
  const [submittedData, setSubmittedData] = useState(null);

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
      setSubmittedData(cropData);

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

      {result && weatherInfo && (
    <div className="mt-6 bg-linear-to-r from-green-100 to-green-50 border border-green-300 rounded-xl shadow-lg p-6">

    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-green-700">
        🌾 Crop Recommendation
      </h2>

      <p className="text-green-600 mt-2">
        Based on your soil and weather conditions
      </p>

      <div className="mt-4 inline-block bg-green-700 text-white px-6 py-3 rounded-full text-2xl font-bold">
        🌱 {result}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">📍 City</h3>
        <p>{weatherInfo.name}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">🌡 Temperature</h3>
        <p>{submittedData?.temperature} °C</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">💧 Humidity</h3>
        <p>{submittedData?.humidity}%</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">🧪 Soil pH</h3>
        <p>{submittedData?.ph}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">🌱 Nitrogen</h3>
        <p>{submittedData?.nitrogen}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">🧪 Phosphorus</h3>
        <p>{submittedData?.phosphorus}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">🪴 Potassium</h3>
        <p>{submittedData?.potassium}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold">🌧 Rainfall</h3>
        <p>{submittedData?.rainfall} mm</p>
      </div>

    </div>

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