// feedbacks.js
import api from "./api";

export const getShownFeedbacks = async () => {
  try {
    const { data } = await api.get("/shownFeedbacks");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const addFeedback = async (payload) => {
  try {
    const { data } = await api.post("/addFeedBack", payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Admin
export const getAllFeedbacks = async () => {
  try {
    const { data } = await api.get("/feedBacks");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateFeedback = async (id, payload) => {
  try {
    const { data } = await api.patch(`/feedBacks/${id}`, payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
