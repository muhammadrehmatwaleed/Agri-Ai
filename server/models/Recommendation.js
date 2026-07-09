const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    crop: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    temperature: Number,
    humidity: Number,
    rainfall: Number,

    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    ph: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Recommendation",
  recommendationSchema
);