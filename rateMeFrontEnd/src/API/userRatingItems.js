// userRatingItems.js
import api from "./api";

export const getUserRatingItems = async () => {
  try {
    const { data } = await api.get("/userRatingItems");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const addUserRatingItem = async (payload) => {
  try {
    const { data } = await api.post("/userRatingItems", payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateUserRatingItem = async (id, payload) => {
  try {
    const { data } = await api.put(`/userRatingItems/${id}`, payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteUserRatingItem = async (id) => {
  try {
    const { data } = await api.delete(`/userRatingItems/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
