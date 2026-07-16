const express = require("express");
const router = express.Router();

const {
  saveRecommendation,
  getRecommendations,
  deleteRecommendation,
  getDashboardStats,
} = require("../controllers/recommendationController");

const authMiddleware = require("../middleware/authMiddleware");

// Save Recommendation
router.post("/", authMiddleware, saveRecommendation);
router.get("/", authMiddleware, getRecommendations);
router.get("/dashboard", authMiddleware, getDashboardStats);
router.delete("/:id", authMiddleware, deleteRecommendation);

module.exports = router;