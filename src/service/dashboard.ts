import { api } from "./api";

export const getBookings = async (token: string) => {
  const response = await api.get("/process/get_bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
