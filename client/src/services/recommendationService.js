import axios from "axios";

const API_URL = "http://localhost:5000/api/recommendations";

export const saveRecommendation = async (recommendationData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, recommendationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },


  });

  return response.data;
};

export const getRecommendations = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};