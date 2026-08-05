import axios from "axios";
import { BASE_URL } from "./env.js";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  validateStatus: () => true,
});

api.interceptors.request.use((config) => {
  console.log(
    `➡ ${config.method.toUpperCase()} ${config.baseURL}${config.url}`
  );
  return config;
});

api.interceptors.response.use((response) => {
  console.log(`⬅ ${response.status}`);
  return response;
});

export default api;