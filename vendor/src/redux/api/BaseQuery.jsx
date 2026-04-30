import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../AuthSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const status = result.error.status;
    const url = typeof args === "string" ? args : args.url;

    const isAuthApi = url?.includes("/vendor-Login");
    if (status === 401 && !isAuthApi) {
      localStorage.setItem("lastPath", window.location.pathname); // save current page pathname
      localStorage.removeItem("token");
      api.dispatch(logout())
      window.dispatchEvent(new Event("unauthorized"));
    }
  }
  return result;
};

export default baseQueryWithAuth;
export { baseQuery };