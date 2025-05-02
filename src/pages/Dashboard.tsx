import { getBookings } from "../service/dashboard";
import { useEffect, useRef, useState } from "react";
import { getUserCookie } from "../utils/user";
import { Button, Header } from "../components/shared";
import { format } from "date-fns";
import { BookingList } from "../components/dashboard";
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
              onClick={handleRefresh}
              className="bg-primary-base mx-auto text-white"
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
      <Header />

      <div className="py-4">
        <div className="laptop:flex tablet:flex phone:hidden items-center gap-6">
          <h4 className="text-lg font-semibold">Today’s Appointment</h4>
          <div className="border border-neutral-secondary rounded px-2 py-1">
            {format(new Date(), "dd-MM-yyyy")}
          </div>
        </div>
        <BookingList bookings={[]} />
      </div>
    </div>
  );
};
