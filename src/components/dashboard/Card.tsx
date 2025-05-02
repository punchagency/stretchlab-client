import client from "../../assets/images/client.png";
import { Button, SvgIcon } from "../shared";
export const Card = () => {
  return (
    <div className="border w-full  py-3 px-4 bg-primary-base rounded-lg">
      <p className="text-base border-b pb-2 text-white border-[#E4E7EC]">
        07:00 AM - 09:30 AM
      </p>

      <div className="flex items-start gap-2 my-4">
        <div>
          <img src={client} alt="client" className="w-7 h-7" />
        </div>
        <div>
          <p className="font-bold text-white">Janica Micheal</p>
          <p className="text-white text-xs flex items-center gap-1">
            <SvgIcon name="phone" width={13} height={13} fill="white" />
            <span>+2348123456789</span>
          </p>
        </div>
      </div>
      <p className="text-base text-white mt-2 pb-3 border-b border-[#E4E7EC]">
        <span className="font-semibold">Booking ID:</span>
        <span> #1233222</span>
      </p>
      <Button className="bg-primary-light w-full py-4 mt-3 text-sm font-normal rounded text-primary-base">
        Start
      </Button>
    </div>
  );
};
