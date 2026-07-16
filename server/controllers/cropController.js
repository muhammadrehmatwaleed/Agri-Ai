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

    // Temporary Recommendation Logic
    let crop = "";

if (temperature >= 25 && humidity >= 80 && rainfall >= 150) {
  crop = "Rice 🌾";
}
else if (temperature >= 18 && temperature <= 25 && rainfall < 100) {
  crop = "Wheat 🌱";
}
else if (temperature >= 26 && temperature <= 35 && rainfall >= 80 && rainfall < 150) {
  crop = "Maize 🌽";
}
else if (temperature >= 28 && humidity >= 60) {
  crop = "Cotton 🌿";
}
else {
  crop = "Sugarcane 🎋";
}

    res.status(200).json({
      success: true,
      recommendation: crop,
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