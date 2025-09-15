// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // for JWT cookies
});

export default api;
