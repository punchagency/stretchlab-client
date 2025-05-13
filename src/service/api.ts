import axios from "axios";
import { deleteUserCookie, getUserCookie } from "../utils/user";
export const api = axios.create({
  baseURL: "http://my-flask-alb-1260955850.eu-north-1.elb.amazonaws.com/api",
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
