import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getMyNotes = async () => {
  const response = await axios.get(`${API}/api/v1/notes/my-notes`, {
    withCredentials: true,
  });
  return response;
};

export const createMyNote = async (data) => {
  const response = await axios.post(`${API}/api/v1/notes`, data, {
    withCredentials: true,
  });
  return response;
};

export const updateMyNote = async (data, id) => {
  const response = await axios.patch(`${API}/api/v1/notes/${id}`, data, {
    withCredentials: true,
  });
  return response;
};

export const deleteMyNote = async (id) => {
  const response = await axios.delete(`${API}/api/v1/notes/${id}`, {
    withCredentials: true,
  });
  return response;
};
