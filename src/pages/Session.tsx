import { useParams } from "react-router";
import { Header, SessionAi, SessionNote } from "../components/session";
import { Button } from "../components/shared";
import logo from "../assets/images/stretchlab.png";
export const Session = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <div>
        <img
          src={logo}
          alt="logo"
          className="laptop:hidden phone:hidden tablet:block w-24 h-10 mb-4"
        />
      </div>
      <Header />
      <div className="phone:flex laptop:hidden tablet:hidden gap-8 mt-6 items-center">
        <h3 className="text-dark-1 laptop:hidden tablet:hidden phone:block font-semibold text-xl">
          Janica Micheal Session
        </h3>
        <div className="bg-grey-2 laptop:hidden tablet:hidden phone:block text-center text-[10px] font-medium text-white rounded py-1 px-3">
          Not Started
        </div>
      </div>
      <div className="flex border justify-between items-center rounded-md px-4 py-3 laptop:mt-9 tablet:mt-9 phone:mt-4 border-[#F0F2F5]">
        <p className="font-medium text-grey-5">9:00 AM - 10:00 AM</p>
        <Button className="bg-primary-base laptop:block tablet:block phone:hidden text-sm py-2 text-white">
          Start Session
        </Button>
      </div>
      <div className="grid laptop:grid-cols-5 tablet:grid-cols-3 phone:grid-cols-1 gap-4 mt-2">
        <div className="laptop:col-span-4 tablet:col-span-2 phone:col-span-1">
          <SessionNote />
        </div>
        <div className="laptop:col-span-1 tablet:col-span-1 laptop:block tablet:block phone:hidden">
          <SessionAi />
        </div>
      </div>
    </div>
  );
};
