import { Button, SvgIcon } from "../shared";
import emptyNote from "../../assets/images/emptynotes.png";

export const SessionNote = () => {
  return (
    <div className="h-full  relative">
      <h3 className="text-base py-4 border-b border-grey-1 font-medium text-[#2C2F3A]">
        Session Notes
      </h3>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div>
          <img
            src={emptyNote}
            alt="empty note"
            className="laptop:w-32 tablet:w-32 phone:w-24 mx-auto"
          />
          <p className="laptop:text-lg tablet:text-lg phone:text-base text-black text-center mt-3">
            Start Session to take notes
          </p>
        </div>
      </div>

      <div className="fixed flex items-center gap-2 bottom-5 laptop:left-8 tablet:left-8 phone:left-4 laptop:w-[76%] tablet:w-[60%] phone:w-[92%] bg-neutral-quaternary p-4 border rounded-2xl border-neutral-quaternary">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full bg-transparent outline-none text-sm text-[#58617B] placeholder:text-[#58617B]"
        />
        <Button className="px-0">
          <SvgIcon name="send" width={14} height={14} fill="#7E8AAD" />
        </Button>
      </div>
    </div>
  );
};
