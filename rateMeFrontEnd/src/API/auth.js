import api from "./api";

// Auth Endpoints

export const registerUser = async (data) => {
  try {
    const { data: res } = await api.post("/register", data);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const login = async (data) => {
  try {
    const { data: res } = await api.post("/login", data);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const logoutUser = async () => {
  try {
    const { data: res } = await api.post("/logout");
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get current user
export const me = async () => {
  try {
    const { data } = await api.get("/me");
    return data;
  } catch (err) {
    if (err.response) {
      console.error("Server error:", err.response.data);
      throw new Error(
        err.response.data.message || JSON.stringify(err.response.data)
      );
    }
    console.error("Network error:", err);
    throw err;
  }
};


export const changePassword = async (payload) => {
  try {
    const { data: res } = await api.post("/change-password", payload);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateProfile = async (payload) => {
  try {
    const { data: res } = await api.post("/update-profile", payload);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const forgotPassword = async (payload) => {
  try {
    const { data: res } = await api.post("/forgot-password", payload);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const resetPassword = async (payload) => {
  try {
    const { data: res } = await api.post("/reset-password", payload);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const verifyEmail = async (verificationData) => {
  try {
    const { data: res } = await api.post("/verify-email", verificationData);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};
