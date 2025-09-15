// adminUsers.js
import api from "./api";

export const getAllUsers = async () => {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const changeUserStatus = async (id, status) => {
  try {
    const { data } = await api.patch(`/users/${id}/status`, { status });
    return data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
