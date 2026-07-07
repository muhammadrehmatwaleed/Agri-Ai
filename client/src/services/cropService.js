import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/crops",
});

// Crop Recommendation
export const recommendCrop = async (cropData) => {
  const response = await API.post("/recommend", cropData);
  return response.data;
};