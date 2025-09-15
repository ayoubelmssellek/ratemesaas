import api from "./api";

// Profile Wi-Fi Info Endpoints (Admin)

// Get all Wi-Fi profiles
export const fetchWifiProfiles = async () => {
  try {
    const { data } = await api.get("/profile-wifi-info");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get a single Wi-Fi profile by id
export const fetchWifiProfile = async (id) => {
  try {
    const { data } = await api.get(`/profile-wifi-info/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create new Wi-Fi profile
export const addWifiProfile = async (payload) => {
  try {
    const { data } = await api.post("/profile-wifi-info", payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update Wi-Fi profile by id
export const updateWifiProfile = async (id, payload) => {
  try {
    const { data } = await api.put(`/profile-wifi-info/${id}`, payload);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete Wi-Fi profile by id
export const deleteWifiProfile = async (id) => {
  try {
    const { data } = await api.delete(`/profile-wifi-info/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
