import { api } from "./api";

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response;
};
export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response;
};
