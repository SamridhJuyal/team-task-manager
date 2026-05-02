import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-a1f1.up.railway.app/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN FOUND:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  console.log("HEADERS SENT:", req.headers); // IMPORTANT

  return req;
});

export default API;
