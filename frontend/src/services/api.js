import axios from "axios";
import { storage } from "@/utils/storage";
import { resetPlayerForLogout } from "@/context/PlayerContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Keep response as is to prevent breaking service files
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      resetPlayerForLogout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default api;