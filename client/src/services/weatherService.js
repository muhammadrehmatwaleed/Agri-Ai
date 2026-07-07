import axios from "axios";

const API_KEY = "a77e1f01557c8c42a98b0e6ce801a5f5";

export const getWeather = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  return response.data;
};