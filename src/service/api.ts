import axios from "axios";
import { deleteUserCookie, getUserCookie } from "../utils/user";
export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

api.interceptors.request.use((config) => {
  const token = getUserCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      deleteUserCookie();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
