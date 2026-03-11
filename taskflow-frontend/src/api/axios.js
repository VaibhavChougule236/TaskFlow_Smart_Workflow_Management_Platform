import axios from "axios";
import { error } from "../utils/toast";

const api = axios.create({
  baseURL: "http://localhost:8285/api"
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

export default api;