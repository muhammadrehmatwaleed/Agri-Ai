// Crop Recommendation Controller

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

    res.status(200).json({
    success: true,
    recommendation: crop,
    reason,
    score,
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