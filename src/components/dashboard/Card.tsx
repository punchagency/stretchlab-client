import client from "../../assets/images/client.png";
import { Button, SvgIcon } from "../shared";
import { Booking } from "../../types/dashboard";
import { useNavigate } from "react-router";
export const Card = ({ booking }: { booking: Booking }) => {
  const navigate = useNavigate();
  return (
    <div className="border w-full  py-3 px-4 bg-primary-base rounded-lg">
      <p className="text-base border-b pb-2 text-white border-[#E4E7EC]">
        {booking.event_date}
      </p>

      <div className="flex items-start gap-2 my-4">
        <div>
          <img src={client} alt="client" className="w-7 h-7" />
        </div>
        <div>
          <p className="font-bold text-white">{booking.client_name}</p>
          <p className="text-white text-xs flex items-center gap-1">
            <SvgIcon name="phone" width={13} height={13} fill="white" />
            <span>{booking.phone}</span>
          </p>
        </div>
      </div>
      <p className="text-base text-white mt-2 pb-3 border-b border-[#E4E7EC]">
        <span className="font-semibold">Booking ID:</span>
        <span> #{booking.booking_id}</span>
      </p>
      <Button
        onClick={() => navigate(`/session/${booking.booking_id}`)}
        className="bg-primary-light w-full py-4 mt-3 text-sm font-normal rounded text-primary-base"
      >
        Start
      </Button>
    </div>
  );
};
