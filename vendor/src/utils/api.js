import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log("TOKEN ", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
 (response) => response.data,
  (error) => {
    if (!error.response) {
      console.error("Network error");
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
