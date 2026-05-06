import axios from "axios";
import { error } from "../utils/toast";

const api = axios.create({
  baseURL: "https://taskflow-backend-h4d0.onrender.com/api"
});

api.interceptors.request.use((config) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (err) => {

    if (err.response?.status === 401 || err.response?.status === 403) {

      error("Session expired. Please login again.");

      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    }

    return Promise.reject(err);
  }
);

export const IMAGE_URL = "http://localhost:8285";

export default api;