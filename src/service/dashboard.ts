import { api } from "./api";

export const getBookings = async (token: string, reset = false) => {
  const response = await api.get(
    `/process/get_bookings?reset=${reset ? "true" : "false"}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
