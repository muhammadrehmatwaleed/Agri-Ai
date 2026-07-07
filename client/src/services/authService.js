import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/farmers",
});

// Login Farmer
export const loginFarmer = async (loginData) => {
  const response = await API.post("/login", loginData);
  return response.data;
};

// Register Farmer
export const registerFarmer = async (farmerData) => {
  const response = await API.post("/register", farmerData);
  return response.data;
};