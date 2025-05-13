import { useNavigate } from "react-router";
import client from "../../assets/images/client.png";
import { Booking } from "../../types/dashboard";
import { SvgIcon } from "../shared";
export const LongCard = ({
  getBookingStyle,
  booking,
}: {
  getBookingStyle: (booking: Booking) => { height: string; top: string };
  booking: Booking;
}) => {
  const isSmall = Number(getBookingStyle(booking).height.split("px")[0]) < 50;

  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/session/${booking.booking_id}`)}
      className="absolute left-4 right-4 cursor-pointer bg-primary-base text-white rounded-lg px-2 flex flex-col justify-center shadow-md"
      style={getBookingStyle(booking)}
    >
      <div className="flex gap-8 items-center">
        <div className="ml-3">
          <div className="flex items-center gap-2">
            <div>
              <img src={client} alt="client" className="w-6 h-6" />
            </div>
            <p
              className={`text-white font-bold ${
                isSmall ? "text-sm" : "text-lg"
              }`}
            >
              {booking.client_name}
            </p>
          </div>
          <p
            className={`text-white flex items-center gap-1 ${
              isSmall ? "mt-0 text-xs " : "mt-1 text-base"
            }`}
          >
            <SvgIcon
              name="phone"
              width={isSmall ? 12 : 15}
              height={isSmall ? 12 : 15}
              fill="#fff"
              className="ml-1"
            />
            <span className="ml-2">{booking.phone}</span>
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p
              className={`text-white font-normal ${
                isSmall ? "text-sm" : "text-lg"
              }`}
            >
              {booking.event_date}
            </p>
          </div>
          <p
            className={`text-white flex items-center gap-1 ${
              isSmall ? "mt-0 text-xs " : "mt-1 text-base"
            }`}
          >
            <span className="font-bold">Booking ID:</span>
            <span className="ml-2">#{booking.booking_id}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
