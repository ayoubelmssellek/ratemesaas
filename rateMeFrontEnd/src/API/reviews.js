// reviews.js
import api from "./api";

export const addReview = async (id, payload) => {
  try {
    const { data } = await api.post(`/review/${id}`, payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getReviewItems = async (id) => {
  try {
    const { data } = await api.get(`/review/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const myReviews = async () => {
  try {
    const { data } = await api.get("/myReviews");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
