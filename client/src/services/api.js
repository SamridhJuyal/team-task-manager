import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-a1f1.up.railway.app/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Content-Type"] = "application/json";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
