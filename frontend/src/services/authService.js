// src/services/authService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // 🔥 IMPORTANT (cookies)
});

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};