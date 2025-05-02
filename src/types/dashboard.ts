export interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
}

export interface BookingListProps {
  bookings: Booking[];
}
