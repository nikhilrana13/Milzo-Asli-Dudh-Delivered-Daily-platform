import { auth } from "@/config/Firebase";
import { logout } from "@/redux/AuthSlice";
import { Store } from "@/redux/Store";
import axios from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(async(config) => {
   //  Only for Google login API Firebase token
  if (config.url.includes("/auth/google-login")) {
    const user = auth.currentUser;
    if (user) {
      const firebaseToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${firebaseToken}`;
    }
    return config;
  }
  //  For all other APIs JWT token
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
    const isAuthApi = url.includes("/google-login");
    // skip login api
    if (status === 401 && !isAuthApi) {
      localStorage.removeItem("token");
      localStorage.setItem("lastPath", window.location.pathname); // save current page pathname
      Store.dispatch(logout())
      window.dispatchEvent(new Event("unauthorized"))
    }
    return Promise.reject(error);
  }
);
