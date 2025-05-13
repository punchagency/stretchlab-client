import { getBookings } from "../service/dashboard";
import { useEffect, useRef, useState } from "react";
import { getUserCookie } from "../utils/user";
import { Button, FullLoader, Header } from "../components/shared";
import { format } from "date-fns";
import { BookingList } from "../components/dashboard";
import { Booking } from "../types";
interface ApiError {
  response?: {
    status: number;
  };
}

export const Dashboard = () => {
  const hasFetched = useRef(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async (reset = false) => {
    const getCookie = getUserCookie();
    try {
      setIsLoading(true);
      const response = await getBookings(getCookie as string, reset);
      console.log(response);
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

  const handleRefresh = (reset = false) => {
    setError(false);
    fetchBookings(reset);
  };
  if (isLoading) {
    return <FullLoader text="Fetching bookings..." />;
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
    <div>
      <Header flexologist_name={bookings[0]?.flexologist_name || ""} />

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
            className="bg-primary-base ml-auto py-1 text-white"
          >
            Refresh
          </Button>
        </div>
        <BookingList bookings={bookings} />
      </div>
    </div>
  );
};
