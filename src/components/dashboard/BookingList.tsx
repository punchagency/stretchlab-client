import React, { FC } from "react";
import { Booking, BookingListProps } from "../../types/dashboard";
import { LongCard } from "./LongCard";
import { Card } from "./Card";

const bookings: Booking[] = [
  {
    id: "1",
    startTime: "07:30",
    endTime: "07:55",
    title: "Morning Briefing",
  },
  {
    id: "2",
    startTime: "10:00",
    endTime: "11:05",
    title: "Project Review",
  },
  {
    id: "3",
    startTime: "12:45",
    endTime: "13:30",
    title: "Lunch Meeting",
  },
  {
    id: "4",
    startTime: "15:20",
    endTime: "16:00",
    title: "Client Consultation",
  },
  {
    id: "5",
    startTime: "18:00",
    endTime: "19:00",
    title: "Team Wrap-Up",
  },
];

export const BookingList: FC<BookingListProps> = () => {
  const hours = Array.from({ length: 13 }, (_, i) => 7 + i);
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const getBookingStyle = (booking: Booking) => {
    const startMinutes = timeToMinutes(booking.startTime);
    const endMinutes = timeToMinutes(booking.endTime);
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
              key={booking.id}
              getBookingStyle={getBookingStyle}
              booking={booking}
            />
          ))}
        </div>
      </div>
      <div className="phone:flex laptop:hidden tablet:hidden flex-col gap-6">
        {bookings.map((item, index) => (
          <Card key={index} />
        ))}
      </div>
    </>
  );
};
