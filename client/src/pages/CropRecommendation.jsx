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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "city" ? value : Number(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get weather from backend
      const weather = await getWeather(formData.city);

      // Create crop data with weather values
      const cropData = {
        nitrogen: formData.nitrogen,
        phosphorus: formData.phosphorus,
        potassium: formData.potassium,
        ph: formData.ph,
        temperature: weather.main.temp,
        humidity: weather.main.humidity,
        rainfall: 100, // Temporary value
      };

      // Get recommendation
      const data = await recommendCrop(cropData);

      setResult(data.recommendation);

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to get recommendation");
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
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition"
        >
          Recommend Crop
        </button>

      </form>

      {result && (
        <div className="mt-6 bg-green-100 p-4 rounded text-center">
          <h2 className="text-xl font-bold text-green-700">
            🌱 Recommended Crop
          </h2>

          <p className="text-2xl font-bold mt-2">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}

export default CropRecommendation;