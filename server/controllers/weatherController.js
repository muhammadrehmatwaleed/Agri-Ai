const axios = require("axios");

const getWeather = async (req, res) => {
  try {
    const { city } = req.params;

    const API_KEY = process.env.WEATHER_API_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.status(200).json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch weather data",
    });
  }
};

module.exports = {
  getWeather,
};