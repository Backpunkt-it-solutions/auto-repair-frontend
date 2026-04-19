import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5007",
});

api.interceptors.request.use((config) => {
  const saved = localStorage.getItem("auth");

  if (saved) {
    const auth = JSON.parse(saved);
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  }

  return config;
});

export default api;
