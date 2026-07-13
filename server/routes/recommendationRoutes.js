const express = require("express");
const router = express.Router();

const {
  saveRecommendation,
  getRecommendations,
  deleteRecommendation,
} = require("../controllers/recommendationController");

const authMiddleware = require("../middleware/authMiddleware");

// Save Recommendation
router.post("/", authMiddleware, saveRecommendation);
router.get("/", authMiddleware, getRecommendations);
router.delete("/:id", authMiddleware, deleteRecommendation);

module.exports = router;