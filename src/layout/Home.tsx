import { Navigate, Outlet } from "react-router";
import { getUserCookie } from "../utils/user";

export const Home = () => {
  const token = getUserCookie();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h4 className="text-2xl font-bold">Home</h4>
      <Outlet />
    </div>
  );
};
