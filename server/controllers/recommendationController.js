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

// Delete Recommendation
const deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    // Make sure the logged-in farmer owns this recommendation
    if (recommendation.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Recommendation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Recommendation deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({
      farmer: req.user.id,
    });

    const totalRecommendations = recommendations.length;

    const averageTemperature =
      totalRecommendations > 0
        ? (
            recommendations.reduce(
              (sum, item) => sum + item.temperature,
              0
            ) / totalRecommendations
          ).toFixed(1)
        : 0;

    const averageHumidity =
      totalRecommendations > 0
        ? (
            recommendations.reduce(
              (sum, item) => sum + item.humidity,
              0
            ) / totalRecommendations
          ).toFixed(1)
        : 0;

    const cropCount = {};

    recommendations.forEach((item) => {
      cropCount[item.crop] = (cropCount[item.crop] || 0) + 1;
    });

    let mostRecommendedCrop = "--";

    if (Object.keys(cropCount).length > 0) {
      mostRecommendedCrop = Object.keys(cropCount).reduce((a, b) =>
        cropCount[a] > cropCount[b] ? a : b
      );
    }

    const recentRecommendations = await Recommendation.find({
    farmer: req.user.id,
   })
  .sort({ createdAt: -1 })
  .limit(5);

  const allRecommendations = await Recommendation.find({
  farmer: req.user.id,
  });

    res.status(200).json({
    success: true,
    totalRecommendations,
    averageTemperature,
    averageHumidity,
    mostRecommendedCrop,

    recentRecommendations,
    allRecommendations,
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
  deleteRecommendation,
  getRecommendations,
  getDashboardStats,
};

