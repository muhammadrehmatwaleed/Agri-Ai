import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recommendCrop } from "../services/cropService";
import { getWeather } from "../services/weatherService";
import jsPDF from "jspdf";
import { saveRecommendation } from "../services/recommendationService";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

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
  const [recommendationTime, setRecommendationTime] = useState("");
  const [confidence, setConfidence] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [reason, setReason] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [fertilizer, setFertilizer] = useState(null);


  const getRecommendationQuality = () => {
  if (score >= 90) {
    return {
      text: "🟢 Excellent",
      color: "bg-green-100 text-green-700 border-green-300",
    };
  }

  if (score >= 80) {
    return {
      text: "🔵 Good",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    };
  }

  if (score >= 70) {
    return {
      text: "🟡 Fair",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    };
  }

  return {
    text: "🔴 Poor",
    color: "bg-red-100 text-red-700 border-red-300",
  };
};


  const cropImages = {
  rice: "https://cdn-icons-png.flaticon.com/512/2909/2909765.png",
  wheat: "https://cdn-icons-png.flaticon.com/512/766/766038.png",
  maize: "https://cdn-icons-png.flaticon.com/512/5346/5346178.png",
  cotton: "https://cdn-icons-png.flaticon.com/512/3159/3159310.png",
  coffee: "https://cdn-icons-png.flaticon.com/512/924/924514.png",
  jute: "https://cdn-icons-png.flaticon.com/512/766/766038.png",
};

const cropMessages = {
  rice: "Rice grows best in warm weather with high humidity.",
  wheat: "Wheat grows well in cool weather with moderate rainfall.",
  maize: "Maize is suitable for warm climates and fertile soil.",
  cotton: "Cotton grows best in warm and dry conditions.",
  coffee: "Coffee prefers mild temperatures and good rainfall.",
  jute: "Jute grows well in hot and humid climates.",
};

const cropTips = {
  rice: "💡 Tip: Keep the soil flooded during the growing season for better yield.",
  wheat: "💡 Tip: Use well-drained soil and avoid overwatering.",
  maize: "💡 Tip: Plant in fertile soil with full sunlight exposure.",
  cotton: "💡 Tip: Avoid excessive watering after flowering.",
  coffee: "💡 Tip: Grow in partial shade with regular irrigation.",
  jute: "💡 Tip: Jute grows best in warm and humid conditions with plenty of water.",
};

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
      console.log("Crop API Response:", data);
      setResult(data.recommendation);
      setFertilizer(data.fertilizer);
      setReason(data.reason);
      setScore(data.score);
      
      await saveRecommendation({
      crop: data.recommendation,

      fertilizerName: data.fertilizer.name,
      fertilizerType: data.fertilizer.type,
      fertilizerDosage: data.fertilizer.dosage,
      fertilizerMethod: data.fertilizer.method,
      fertilizerPrecaution: data.fertilizer.precaution,

      score: data.score,
      reason: data.reason,

      city: weather.name,
      temperature: cropData.temperature,
      humidity: cropData.humidity,
      rainfall: cropData.rainfall,
      nitrogen: cropData.nitrogen,
      phosphorus: cropData.phosphorus,
      potassium: cropData.potassium,
      ph: cropData.ph,
      });

      setConfidence("95%");
      if (weather.main.temp < 25) {
      setRiskLevel("🟢 Low");
      } else if (weather.main.temp <= 35) {
      setRiskLevel("🟡 Medium");
      } else {
      setRiskLevel("🔴 High");
      }
      setRecommendationTime(new Date().toLocaleString());

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

  const resetForm = () => {
  setResult("");
  setWeatherInfo(null);
  setSubmittedData(null);

  setFormData({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    city: "",
  });
};

const cropName = (result || "")
  .replace(/[^\w\s]/g, "")
  .trim()
  .toLowerCase();



  const downloadPDF = () => {
  const doc = new jsPDF();

  const reportId = `AGR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  doc.setFontSize(20);
  doc.text(`Report ID: ${reportId}`, 20, 30);
  doc.text("AgriAI Crop Recommendation Report", 20, 20);

  doc.setFontSize(12);

  const cleanCrop = result.replace(/[^\w\s]/g, "").trim();
  const cleanRisk = riskLevel.replace(/[^\w\s]/g, "").trim();
  const toAscii = (value = "") =>
    String(value)
      .split("")
      .filter((char) => char.charCodeAt(0) <= 127)
      .join("");

  doc.text(`Crop: ${cleanCrop}`, 20, 40);
  doc.text(`Recommendation Reason: ${reason}`, 20, 50, {
  maxWidth: 170,
});
  doc.text(`Suitability Score: ${score}%`, 20, 70);
  doc.text(
  `Recommendation Quality: ${toAscii(quality.text)}`,
  20,
  80
);
  doc.text(
  `Soil Health: ${toAscii(soilHealth.status)}`,
  20,
  90
);
  doc.text(
  `Weather Risk: ${toAscii(weatherRisk.status)}`,
  20,
  100
);
  doc.text(`City: ${weatherInfo?.name}`, 20, 115);
  doc.text(`Temperature: ${submittedData?.temperature} °C`, 20, 125);
  doc.text(`Humidity: ${submittedData?.humidity}%`, 20, 135);
  doc.text(`Rainfall: ${submittedData?.rainfall} mm`, 20, 145);
  doc.text(`Soil pH: ${submittedData?.ph}`, 20, 155);
  doc.text(`Nitrogen: ${submittedData?.nitrogen}`, 20, 165);
  doc.text(`Phosphorus: ${submittedData?.phosphorus}`, 20, 175);
  doc.text(`Potassium: ${submittedData?.potassium}`, 20, 185);
  doc.text(`Confidence: ${confidence}`, 20, 195);
  doc.text(`Risk Level: ${cleanRisk}`, 20, 205);
  doc.text(`Generated: ${recommendationTime}`, 20, 215);
  doc.text("Personalized Farming Advice:", 20, 230);
  doc.text(
  toAscii(farmingAdvice),
  20,
  240,
  {
    maxWidth: 170,
  }
);
  
  doc.setFontSize(10);

  doc.text("----------------------------------------", 20, 265);

  doc.text(
  "Generated by AgriAI - Smart Farming Assistant",
  20,
  275
);

  doc.text(
  "Thank you for using AgriAI!",
  20,
  285
);

  doc.save("AgriAI-Crop-Recommendation-Report.pdf");
};


const quality = getRecommendationQuality();



const getSoilHealth = () => {
  const n = Number(submittedData?.nitrogen || 0);
  const p = Number(submittedData?.phosphorus || 0);
  const k = Number(submittedData?.potassium || 0);

  const average = (n + p + k) / 3;

  if (average >= 70) {
    return {
      status: "🟢 Excellent",
      color: "text-green-700",
    };
  }

  if (average >= 50) {
    return {
      status: "🔵 Good",
      color: "text-blue-700",
    };
  }

  if (average >= 30) {
    return {
      status: "🟡 Moderate",
      color: "text-yellow-700",
    };
  }

  return {
    status: "🔴 Poor",
    color: "text-red-700",
  };
};

const soilHealth = getSoilHealth();



const getFarmingAdvice = () => {
  switch (cropName) {
    case "Rice":
      return "🌾 Maintain standing water during early growth, use certified seed, and apply nitrogen fertilizer in split doses.";

    case "Wheat":
      return "🌱 Use timely irrigation, apply balanced fertilizer, and monitor weeds during the early growth stage.";

    case "Maize":
      return "🌽 Ensure proper spacing between plants and apply nitrogen fertilizer at key growth stages.";

    case "Cotton":
      return "☁️ Monitor for pests regularly, avoid waterlogging, and maintain proper soil moisture.";

    case "Sugarcane":
      return "🍬 Irrigate regularly, apply organic manure, and remove weeds to improve yield.";

    default:
      return "🌱 Follow good agricultural practices and consult your local agriculture department for guidance.";
  }
};

const farmingAdvice = getFarmingAdvice();



const getWeatherRisk = () => {
  const temp = Number(submittedData?.temperature || 0);
  const humidity = Number(submittedData?.humidity || 0);
  const rainfall = Number(submittedData?.rainfall || 0);

  if (
    temp >= 20 &&
    temp <= 30 &&
    humidity >= 60 &&
    humidity <= 80 &&
    rainfall >= 80
  ) {
    return {
      status: "🟢 Low Risk",
      color: "text-green-700",
      message: "Weather conditions are highly favorable for crop growth.",
    };
  }

  if (
    temp >= 15 &&
    temp <= 35 &&
    humidity >= 40 &&
    humidity <= 90
  ) {
    return {
      status: "🟡 Medium Risk",
      color: "text-yellow-700",
      message: "Weather is acceptable, but monitor crops regularly.",
    };
  }

  return {
    status: "🔴 High Risk",
    color: "text-red-700",
    message: "Current weather may negatively affect crop growth. Take preventive measures.",
  };
};

const weatherRisk = getWeatherRisk();



const getFarmReport = () => {
  return `
Recommended Crop: ${result}

Suitability Score: ${score}%

Recommendation Quality: ${quality.text}

Soil Health: ${soilHealth.status}

Weather Risk: ${weatherRisk.status}

Recommendation Reason:
${reason}

Farming Advice:
${farmingAdvice}
`;
};

const farmReport = getFarmReport();




const suitabilityChartData = {
  labels: ["Suitable", "Remaining"],
  datasets: [
    {
      data: [score, 100 - score],
      backgroundColor: [
        "#16a34a",
        "#e5e7eb",
      ],
      borderWidth: 1,
    },
  ],
};

const suitabilityChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: "70%",
};



  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌾 Crop Recommendation
         </h1>
        {recommendationTime && (
        <p className="text-center text-gray-500 mt-2">
        🕒 Recommended on: {recommendationTime}
        </p>
)}
        {confidence && (
        <div className="flex justify-center mt-3">
         <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
      ✅ Confidence: {confidence}
         </span>
        </div>
)}
        {riskLevel && (
        <div className="flex justify-center mt-3">
         <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
         Risk Level: {riskLevel}
         </span>
        </div>
)}
      

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

      <img
      src={
      cropImages[cropName] ||
      "https://cdn-icons-png.flaticon.com/512/628/628324.png"
          }
      alt={result}
     className="w-32 h-32 mx-auto mt-6 object-contain"
      />
  
     <p className="text-center text-gray-700 mt-4">
     {cropMessages[cropName] ||
     "This crop is suitable for the given conditions."}
      </p>

<div className="mt-5 bg-blue-50 border border-blue-300 rounded-lg p-4">

     <h3 className="text-lg font-bold text-blue-700 mb-2">
    💡 Why this crop?
    </h3>

    <p className="text-gray-700">
    {reason}
    </p>

</div>


<div className="mt-5 bg-white border border-green-200 rounded-lg p-4">

  <div className="flex justify-between mb-2">
    <span className="font-bold text-green-700">
      ⭐ Suitability Score
    </span>

    <span className="font-bold">
      {score}%
    </span>
  </div>

  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className="bg-green-600 h-4 rounded-full transition-all duration-700"
      style={{ width: `${score}%` }}
    ></div>
  </div>

</div>




<div className="mt-6 flex flex-col items-center">

  <h3 className="text-xl font-bold text-green-700 mb-4">
    📊 Crop Suitability Meter
  </h3>

  <div className="w-56 h-56">
    <Doughnut
      data={suitabilityChartData}
      options={suitabilityChartOptions}
    />
  </div>

  <p className="mt-4 text-lg font-semibold">
    {score}% Suitable
  </p>

</div>



<div className="mt-4">

  <span
    className={`px-4 py-2 rounded-full border font-bold ${quality.color}`}
  >
    {quality.text}
  </span>

</div>


     <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg">
     <p className="text-gray-800 font-medium">
     {cropTips[cropName] ||
     "💡 Follow good farming practices for the best yield."}
     </p>
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
       <h3 className="font-bold">🌱 Soil Health</h3>
       <p className={`font-semibold ${soilHealth.color}`}>
       {soilHealth.status}
      </p>
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

<div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-5">

  <h3 className="text-xl font-bold text-green-700 mb-3">
    👨‍🌾 Personalized Farming Advice
  </h3>

  <p className="text-gray-700 leading-7">
    {farmingAdvice}
  </p>

</div>





{fertilizer && (
  <div className="mt-8 bg-green-50 border border-green-300 rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold text-green-700 mb-4">
      🌱 Fertilizer Recommendation
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">📦 Fertilizer</h3>
        <p>{fertilizer.name}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">🧪 Type</h3>
        <p>{fertilizer.type}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">⚖️ Dosage</h3>
        <p>{fertilizer.dosage}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">🌾 Application Method</h3>
        <p>{fertilizer.method}</p>
      </div>

    </div>

    <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg">
      <strong>⚠️ Precaution:</strong>
      <p>{fertilizer.precaution}</p>
    </div>

  </div>
)}







<div className="mt-6 bg-white border border-blue-200 rounded-xl p-5 shadow">

  <h3 className="text-xl font-bold text-blue-700 mb-3">
    🌦 Weather Risk Analysis
  </h3>

  <p className={`text-lg font-semibold ${weatherRisk.color}`}>
    {weatherRisk.status}
  </p>

  <p className="text-gray-700 mt-2">
    {weatherRisk.message}
  </p>

</div>




<div className="mt-6 bg-gray-50 border border-gray-300 rounded-xl p-6 shadow">

  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    📋 Overall Farm Report
  </h2>

  <textarea
    readOnly
    value={farmReport}
    rows={12}
    className="w-full border rounded-lg p-4 bg-white text-gray-700"
  />

</div>




<div className="mt-6 bg-green-50 border border-green-300 rounded-lg p-5">
  <h3 className="text-xl font-bold text-green-700 mb-3">
    📋 Recommendation Summary
  </h3>

  <ul className="space-y-2 text-gray-700">
    <li><strong>🌱 Crop:</strong> {result}</li>
    <li><strong>📍 City:</strong> {weatherInfo?.name}</li>
    <li><strong>🌡 Temperature:</strong> {submittedData?.temperature} °C</li>
    <li><strong>💧 Humidity:</strong> {submittedData?.humidity}%</li>
    <li><strong>🧪 Soil pH:</strong> {submittedData?.ph}</li>
    <li><strong>✅ Confidence:</strong> {confidence}</li>
    <li><strong>⚠️ Risk Level:</strong> {riskLevel}</li>
    <li><strong>🕒 Generated:</strong> {recommendationTime}</li>
  </ul>
</div>
<div className="mt-6 text-center">
  <button
    onClick={resetForm}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
  >
    🔄 Try Another Recommendation
  </button>
</div>
<div className="mt-6 text-center">
  <button
    onClick={downloadPDF}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
  >
    📄 Download Recommendation PDF
  </button>
</div>
<div className="mt-4 text-center">
  <button
    onClick={() => navigate("/history")}
    className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
  >
    📜 View Recommendation History
  </button>
</div>
      
    </div>
  );
}

export default CropRecommendation;