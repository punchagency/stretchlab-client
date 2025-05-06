export interface Booking {
  id: string;
  client_name: string;
  phone: string;
  event_date: string;
  workout_type: string;
  booking_id: string;
  flexologist_name: string;
  past: boolean;
}

export interface BookingListProps {
  bookings: Booking[];
}
