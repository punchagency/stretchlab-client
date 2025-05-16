import { getBookings } from "../service/dashboard";
import { useEffect, useRef, useState } from "react";
import { getUserCookie, deleteUserCookie } from "../utils/user";
import { Button, FullLoader, Header } from "../components/shared";
import { format } from "date-fns";
import { BookingList } from "../components/dashboard";
import { Booking } from "../types";
import { Navigate, useNavigate } from "react-router";
import { logout } from "../service/auth";
interface ApiError {
  response?: {
    status: number;
  };
}

export const Dashboard = () => {
  const hasFetched = useRef(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [logoutError, setLogoutError] = useState(false);
  const token = getUserCookie();
  const navigate = useNavigate();

  const fetchBookings = async (reset = false) => {
    const getCookie = getUserCookie();
    try {
      setIsLoading(true);
      const response = await getBookings(getCookie as string, reset);
      if (response.status === 200) {
        setBookings(response.data.bookings);
      } else {
        setError(true);
      }
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.response?.status !== 401) {
        setError(true);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchBookings();
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await logout();
      if (response.status === 200) {
        deleteUserCookie();
        navigate("/login");
      } else {
        setLogoutError(true);
      }
    } catch (error) {
      console.error(error);
      setLogoutError(true);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleRefresh = (reset = false) => {
    setError(false);
    fetchBookings(reset);
  };
  if (isLoading) {
    return <FullLoader text="Fetching bookings..." />;
  }
  if (isLoggingOut) {
    return <FullLoader text="Logging out..." />;
  }
  if (error) {
    return (
      <div className="h-[70vh] grid place-items-center">
        <div>
          <p className="text-grey-2 font-semibold text-2xl text-center">
            An Error Occured
          </p>
          <p className="text-grey-5 text-base">
            An error occured when fetching bookings. Please try again
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => handleRefresh(false)}
              className="bg-primary-base mx-auto py-2 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="laptop:px-8 tablet:px-6 phone:px-4 py-4">
      <Header
        handleLogout={handleLogout}
        flexologist_name={bookings[0]?.flexologist_name || ""}
      />
      {logoutError && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          <p className="font-semibold">An error occurred while logging out.</p>
        </div>
      )}

      <div className="py-4">
        <div className="flex items-center">
          <div className="laptop:flex tablet:flex phone:hidden items-center gap-6">
            <h4 className="text-lg font-semibold">Today’s Appointment</h4>
            <div className="border border-neutral-secondary rounded px-2 py-1">
              {format(new Date(), "dd-MM-yyyy")}
            </div>
          </div>
          <Button
            onClick={() => handleRefresh(true)}
            className="bg-primary-base ml-auto py-1 phone:mb-4 text-white"
          >
            Refresh
          </Button>
        </div>
        <BookingList bookings={bookings} />
      </div>
    </div>
  );
};
