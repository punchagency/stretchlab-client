import { Navigate } from "react-router";
import { getUserCookie } from "../utils/user";
export const Home = () => {
  const token = getUserCookie();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
};
