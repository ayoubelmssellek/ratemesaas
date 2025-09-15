import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get("/statistics");
  return response.data;
};
export const getDashboardStats = async () => {
  const response = await api.get("/dashboardStats");
  return response.data;
};
