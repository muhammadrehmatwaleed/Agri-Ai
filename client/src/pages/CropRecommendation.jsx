import { useState } from "react";

function CropRecommendation() {
  const [soil, setSoil] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [result, setResult] = useState("");
  const recommendCrop = () => {
  if (!soil || !temperature || !rainfall) {
    alert("Please fill all fields.");
    return;
  }

  let crop;

  if (soil === "Loamy" && Number(temperature) >= 20 && Number(rainfall) >= 100) {
    crop = "🌾 Wheat";
  } else if (soil === "Clay" && Number(temperature) >= 25 && Number(rainfall) >= 150) {
    crop = "🌾 Rice";
  } else if (soil === "Sandy") {
    crop = "🥜 Groundnut";
  } else if (soil === "Black Soil") {
    crop = "🌱 Cotton";
  } else {
    crop = "🌽 Maize";
  }

  setResult(crop);
};

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          🌱 Crop Recommendation
        </h1>

        <div className="space-y-5">

          <div>
            <label className="font-semibold">
              Soil Type
            </label>

            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">Select Soil</option>
              <option>Sandy</option>
              <option>Clay</option>
              <option>Loamy</option>
              <option>Black Soil</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Temperature (°C)
            </label>

            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Enter Temperature"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Rainfall (mm)
            </label>

            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder="Enter Rainfall"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <button
          onClick={recommendCrop}
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">
          Recommend Crop
          </button>
          {result && (

         <div className="mt-8 text-center">

         <h2 className="text-2xl font-bold text-green-700">
         Recommended Crop
         </h2>

         <p className="text-4xl mt-4">
         {result}
         </p>

         </div>
    )}

        </div>

      </div>

    </div>
  );
}

export default CropRecommendation;