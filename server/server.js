require("dotenv").config();

const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");



const app = express();
app.use(cors());

const farmerRoutes = require("./routes/farmerRoutes");
const cropRoutes = require("./routes/cropRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

app.use(express.json());

app.use("/api/farmers", farmerRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/weather", weatherRoutes);


const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});