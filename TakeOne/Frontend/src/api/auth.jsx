import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Change if deployed

// User Signup
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data?.message);
    throw error.response?.data || error;
  }
};

// User Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data?.message);
    throw error.response?.data || error;
  }
};
