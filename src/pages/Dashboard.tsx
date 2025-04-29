import { getBookings } from "../service/dashboard";
import { useEffect, useRef } from "react";
import { getUserCookie } from "../utils/user";

export const Dashboard = () => {
  const hasFetched = useRef(false);

  useEffect(() => {
    const getCookie = getUserCookie();
    if (!hasFetched.current) {
      hasFetched.current = true;
      const fetchBookings = async () => {
        try {
          const response = await getBookings(getCookie as string);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBookings();
    }
  }, []);

  return <div>Dashboard</div>;
};
