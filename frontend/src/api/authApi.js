import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const signUp = async (data) => {
  const response = await axios.post(`${API}/api/v1/users/signup`, data, {
    withCredentials: true,
  });
  return response;
};

export const login = async (data) => {
  const response = await axios.post(`${API}/api/v1/users/login`, data, {
    withCredentials: true,
  });
  return response;
};
