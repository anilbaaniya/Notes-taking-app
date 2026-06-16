import axios from "axios";

export const getMyNotes = async () => {
  const response = await axios.get("/api/v1/notes/my-notes", {
    withCredentials: true,
  });
  return response;
};

export const createMyNote = async (data) => {
  const response = await axios.post("/api/v1/notes", data, {
    withCredentials: true,
  });
  return response;
};

export const updateMyNote = async (data, id) => {
  const response = await axios.patch(`/api/v1/notes/${id}`, data, {
    withCredentials: true,
  });
  return response;
};

export const deleteMyNote = async (id) => {
  const response = await axios.delete(`/api/v1/notes/${id}`, {
    withCredentials: true,
  });
  return response;
};
