import api from "./api";

// Social Media Usernames Endpoints (Admin)

// Get all usernames
export const fetchSocialUsernames = async () => {
  try {
    const { data } = await api.get("/social-media-usernames");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get a single username by id
export const fetchSocialUsername = async (id) => {
  try {
    const { data } = await api.get(`/social-media-usernames/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create new social username
export const addSocialUsername = async (payload) => {
  try {
    const { data } = await api.post("/social-media-usernames", payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update social username by id
export const updateSocialUsername = async (id, payload) => {
  try {
    const { data } = await api.put(`/social-media-usernames/${id}`, payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete social username by id
export const deleteSocialUsername = async (id) => {
  try {
    const { data } = await api.delete(`/social-media-usernames/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
