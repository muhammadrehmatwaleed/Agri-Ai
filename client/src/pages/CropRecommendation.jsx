import { useState } from "react";
import { recommendCrop } from "../services/cropService";

function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await recommendCrop(formData);
      setResult(data.recommendation);
    } catch (error) {
      console.error(error);
      alert("Failed to get recommendation");
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
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="phosphorus"
          placeholder="Phosphorus"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="potassium"
          placeholder="Potassium"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="temperature"
          placeholder="Temperature"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="humidity"
          placeholder="Humidity"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          step="0.1"
          name="ph"
          placeholder="Soil pH"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="rainfall"
          placeholder="Rainfall"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
        >
          Recommend Crop
        </button>

      </form>

      {result && (
        <div className="mt-6 bg-green-100 p-4 rounded text-center">
          <h2 className="text-xl font-bold text-green-700">
            Recommended Crop
          </h2>

          <p className="text-2xl mt-2">{result}</p>
        </div>
      )}
    </div>
  );
}

export default CropRecommendation;