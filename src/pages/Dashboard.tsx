import { getBookings } from "../service/dashboard";
import { useEffect, useRef, useState } from "react";
import { getUserCookie } from "../utils/user";
import { Button } from "../components/shared";

interface ApiError {
  response?: {
    status: number;
  };
}

export const Dashboard = () => {
  const hasFetched = useRef(false);
  const [error, setError] = useState(false);

  const fetchBookings = async () => {
    const getCookie = getUserCookie();
    try {
      const response = await getBookings(getCookie as string);
      console.log(response);
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.response?.status !== 401) {
        setError(true);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchBookings();
    }
  }, []);

  const handleRefresh = () => {
    setError(false);
    fetchBookings();
  };

  return (
    <div>
      {error && (
        <Button onClick={handleRefresh} className="bg-primary-base text-white">
          Refresh
        </Button>
      )}
      Dashboard
    </div>
  );
};
