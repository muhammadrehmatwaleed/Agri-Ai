const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getFarmers,
  registerFarmer,
  loginFarmer,
  getProfile,
  updateProfile,
} = require("../controllers/farmerController");

router.get("/", protect, getFarmers);
router.post("/register", registerFarmer);
router.post("/login", loginFarmer);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;