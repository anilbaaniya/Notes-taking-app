import axios from "axios";

export const signUp = async (data) => {
  const response = await axios.post("/api/v1/users/signup", data, {
    withCredentials: true,
  });
  return response;
};

export const login = async (data) => {
  const response = await axios.post("/api/v1/users/login", data, {
    withCredentials: true,
  });
  return response;
};
