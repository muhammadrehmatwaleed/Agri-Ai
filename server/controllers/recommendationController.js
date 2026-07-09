const Recommendation = require("../models/Recommendation");

// Save Recommendation
const saveRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.create({
      farmer: req.user.id,

      crop: req.body.crop,
      city: req.body.city,

      temperature: req.body.temperature,
      humidity: req.body.humidity,
      rainfall: req.body.rainfall,

      nitrogen: req.body.nitrogen,
      phosphorus: req.body.phosphorus,
      potassium: req.body.potassium,
      ph: req.body.ph,
    });

    res.status(201).json({
      success: true,
      message: "Recommendation saved successfully",
      recommendation,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in Farmer Recommendations
const getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({
      farmer: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      recommendations,
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
  saveRecommendation,
  getRecommendations,
};

