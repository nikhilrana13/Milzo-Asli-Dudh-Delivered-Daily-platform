import { Store } from "@/redux/Store";
import axios from "axios";



export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(async(config) => {
  //  For all  APIs JWT token
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
 (response) => response.data,
  (error) => {
    if (!error.response) {
      console.error("Network error");
      return Promise.reject(error);
    }
    const status = error.response.status;
    const url = error.config.url;
    const isAuthApi = url.includes("/api/auth/admin-login");
    // skip login api
    if (status === 401 && !isAuthApi) {
      localStorage.removeItem("token");
      Store.dispatch(logout())
      window.dispatchEvent(new Event("unauthorized"))
    }
    return Promise.reject(error);
  }
);
