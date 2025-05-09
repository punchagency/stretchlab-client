import { FC } from "react";
import { Booking, BookingListProps } from "../../types/dashboard";
import { LongCard } from "./LongCard";
import { Card } from "./Card";

export const BookingList: FC<BookingListProps> = ({ bookings }) => {
  const hours = Array.from({ length: 13 }, (_, i) => 7 + i);
  const timeToMinutes = (time: string): number => {
    const [timePart, period] = time.trim().split(" ");
    const [initialHours, minutes] = timePart.split(":").map(Number);
    let hours = initialHours;

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  const getBookingStyle = (booking: Booking) => {
    const startMinutes = timeToMinutes(booking.event_date.split("-")[0].trim());
    const endMinutes = timeToMinutes(booking.event_date.split("-")[1].trim());
    const startOfDay = 7 * 60;
    const pixelsPerMinute = 112 / 60;
    const offset = 56;

    const top = (startMinutes - startOfDay) * pixelsPerMinute + offset;
    const height = (endMinutes - startMinutes) * pixelsPerMinute;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  return (
    <>
      <div className="relative phone:hidden laptop:flex tablet:flex w-full h-full">
        <div className="w-20 flex flex-col">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-28 flex items-center justify-end pr-4 text-xs font-medium text-grey-2"
            >
              {hour > 12
                ? `${hour - 12}:00 PM`
                : hour === 12
                ? "12:00 PM"
                : `${hour}:00 AM`}
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          {hours.map((hour, index) => (
            <div
              key={hour}
              className="absolute w-full border-t border-gray-300"
              style={{ top: index === 0 ? "56px" : `${index * 112 + 56}px` }}
            />
          ))}

          {bookings.map((booking) => (
            <LongCard
              key={booking.booking_id}
              getBookingStyle={getBookingStyle}
              booking={booking}
            />
          ))}
        </div>
      </div>
      <div className="phone:flex laptop:hidden tablet:hidden flex-col gap-6">
        {bookings.map((item, index) => (
          <Card key={index} booking={item} />
        ))}
      </div>
    </>
  );
};
