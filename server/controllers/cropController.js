// Crop Recommendation Controller
const getFertilizerRecommendation = (crop) => {
  switch (crop) {
    case "Rice 🌾":
      return {
        name: "NPK 20-20-20",
        type: "Chemical",
        dosage: "50 kg per acre",
        method: "Apply in two equal splits during crop growth.",
        precaution: "Avoid application before heavy rainfall.",
      };

    case "Wheat 🌱":
      return {
        name: "DAP + Urea",
        type: "Chemical",
        dosage: "45 kg DAP + 50 kg Urea per acre",
        method: "DAP at sowing, Urea after first irrigation.",
        precaution: "Do not overuse nitrogen fertilizer.",
      };

    case "Maize 🌽":
      return {
        name: "NPK 15-15-15",
        type: "Chemical",
        dosage: "60 kg per acre",
        method: "Apply before sowing and during vegetative stage.",
        precaution: "Keep fertilizer away from plant stems.",
      };

    case "Cotton ☁️":
      return {
        name: "NPK 12-24-12",
        type: "Chemical",
        dosage: "50 kg per acre",
        method: "Apply before flowering stage.",
        precaution: "Do not apply on wet leaves.",
     };

    case "Sugarcane 🍬":
     return {
       name: "Urea + Potash",
       type: "Chemical",
       dosage: "80 kg per acre",
       method: "Apply in three equal splits.",
       precaution: "Irrigate after fertilizer application.",
     };

    default:
      return {
        name: "Organic Compost",
        type: "Organic",
        dosage: "100 kg per acre",
        method: "Mix thoroughly into the soil.",
        precaution: "Ensure compost is fully decomposed.",
      };
  }
};








const recommendCrop = async (req, res) => {
  try {
    const {
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
    } = req.body;

let score = 0;
let reason = "";
// Temporary Recommendation Logic
let crop = "";

if (
  nitrogen >= 70 &&
  phosphorus >= 40 &&
  potassium >= 40 &&
  temperature >= 25 &&
  rainfall >= 180 &&
  humidity >= 75 &&
  ph >= 5.5 &&
  ph <= 7
) {
  crop = "Rice 🌾";
  reason =
  "High rainfall, warm temperature, suitable humidity, and ideal soil nutrients make Rice the best recommendation.";
  score = 95;
  }

else if (
  nitrogen >= 50 &&
  phosphorus >= 30 &&
  potassium >= 30 &&
  temperature >= 18 &&
  temperature <= 25 &&
  rainfall >= 50 &&
  rainfall <= 120 &&
  ph >= 6 &&
  ph <= 7.5
) {
  crop = "Wheat 🌱";
  reason =
  "Moderate temperature, balanced rainfall, and healthy soil nutrients are suitable for Wheat.";
  score = 90;
}

else if (
  nitrogen >= 40 &&
  phosphorus >= 40 &&
  potassium >= 20 &&
  temperature >= 22 &&
  temperature <= 32 &&
  rainfall >= 80 &&
  rainfall <= 150
) {
  crop = "Maize 🌽";
  reason =
  "Current environmental conditions are favorable for Maize cultivation.";
  score = 88;
}

else if (
  nitrogen >= 60 &&
  phosphorus >= 35 &&
  potassium >= 35 &&
  temperature >= 20 &&
  temperature <= 32 &&
  rainfall >= 100 &&
  rainfall <= 250
) {
  crop = "Cotton ☁️";
  reason =
  "Warm climate and balanced soil nutrients make Cotton a suitable crop.";
  score = 86;
}

else if (
  nitrogen >= 80 &&
  phosphorus >= 40 &&
  potassium >= 40 &&
  temperature >= 24 &&
  rainfall >= 120 &&
  humidity >= 70
) {
  crop = "Sugarcane 🍬";
  reason =
  "High humidity, sufficient rainfall, and rich soil nutrients are ideal for Sugarcane.";
  score = 92;
}

else {
  crop = "No suitable crop found 🌱";
  reason =
  "The provided soil and weather conditions do not closely match our supported crops.";
  score = 50;
}


const fertilizer = getFertilizerRecommendation(crop);

  res.status(200).json({
  success: true,
  recommendation: crop,
  fertilizer,
  score,
  reason,
  input: {
    nitrogen,
    phosphorus,
    potassium,
    temperature,
    humidity,
    ph,
    rainfall,
  },
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  recommendCrop,
};