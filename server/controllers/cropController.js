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

    if (temperature > 25 && rainfall > 150) {
      crop = "Rice 🌾";
    } else if (temperature < 25 && rainfall < 100) {
      crop = "Wheat 🌱";
    } else {
      crop = "Maize 🌽";
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