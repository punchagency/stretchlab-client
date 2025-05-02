import { Navigate, Outlet } from "react-router";
import { getUserCookie } from "../utils/user";
export const Home = () => {
  const token = getUserCookie();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="laptop:px-8 tablet:px-6 phone:px-4 py-4">
      <Outlet />
    </div>
  );
};
