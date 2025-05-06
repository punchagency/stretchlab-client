import { useNavigate } from "react-router";
import { Button, SvgIcon } from "../shared";

export const Header = ({
  started,
  client_name,
  handleClick,
}: {
  started: boolean;
  client_name: string;
  handleClick: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-8 pt-2 py-4 border-b border-neutral-tertiary">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 border-r border-grey-1 pr-2"
      >
        <div className="h-6 w-6 grid place-items-center border border-grey-1 rounded-lg">
          <SvgIcon name="angle-left" width={6} height={9} fill="#353945" />
        </div>
        <span className="text-dark-1 font-medium">Back</span>
      </button>

      <h3 className="text-dark-1 laptop:block tablet:block phone:hidden font-semibold text-xl">
        {client_name} Session
      </h3>
      <div
        className={`${
          started ? "bg-[#F3A218] text-dark-1" : "bg-grey-2 text-white"
        } laptop:block tablet:block phone:hidden text-center text-[10px] font-medium  rounded py-1 px-3`}
      >
        {started ? "In Progress" : "Not Started"}
      </div>
      <Button
        onClick={handleClick}
        className="bg-primary-base laptop:hidden tablet:hidden phone:block text-sm py-2 ml-auto text-white"
      >
        Start Session
      </Button>
    </div>
  );
};
