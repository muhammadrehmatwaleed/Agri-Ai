const Farmer = require("../models/Farmer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Get All Farmers
const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Farmer
const registerFarmer = async (req, res) => {
  try {
    const { name, email, password, village, phone } = req.body;

    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({ email });

    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save farmer
    const farmer = await Farmer.create({
      name,
      email,
      password: hashedPassword,
      village,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Farmer Registered Successfully 🌾",
      farmer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find farmer by email
    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, farmer.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
  {
    id: farmer._id,
    email: farmer.email,
  },
    process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    res.status(200).json({
      success: true,
      message: "Login Successful 🎉",
      farmer,
      token,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in Farmer Profile
const getProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id).select("-password");

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    res.status(200).json({
      success: true,
      farmer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Logged-in Farmer Profile
const updateProfile = async (req, res) => {
  try {
    const { name, village, phone } = req.body;

    const farmer = await Farmer.findById(req.user.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    // Update fields
    farmer.name = name || farmer.name;
    farmer.village = village || farmer.village;
    farmer.phone = phone || farmer.phone;

    await farmer.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully ✅",
      farmer,
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
  getFarmers,
  registerFarmer,
  loginFarmer,
  getProfile,
  updateProfile,
};