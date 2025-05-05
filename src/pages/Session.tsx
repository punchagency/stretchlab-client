import { useNavigate, useParams } from "react-router";
import { Header, SessionAi, SessionNote } from "../components/session";
import { Button, ConfirmModal, SuccessModal } from "../components/shared";
import logo from "../assets/images/stretchlab.png";
import { useState } from "react";
export const Session = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate("/dashboard");
  }
  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const handleConfirm = () => {
    console.log("Confirming action");
  };

  const startSession = () => {
    setStarted(true);
  };
  return (
    <div>
      <div>
        <img
          src={logo}
          alt="logo"
          className="laptop:hidden phone:hidden tablet:block w-24 h-10 mb-4"
        />
      </div>
      <Header started={started} />
      <div className="phone:flex laptop:hidden tablet:hidden gap-8 mt-6 items-center">
        <h3 className="text-dark-1 laptop:hidden tablet:hidden phone:block font-semibold text-xl">
          Janica Micheal Session
        </h3>
        <div
          className={`${
            started ? "bg-[#F3A218] text-dark-1" : "bg-grey-2 text-white"
          } laptop:hidden tablet:hidden phone:block text-center text-[10px] font-medium  rounded py-1 px-3`}
        >
          {started ? "In Progress" : "Not Started"}
        </div>
      </div>
      <div className="flex border justify-between items-center rounded-md px-4 py-3 laptop:mt-9 tablet:mt-9 phone:mt-4 border-[#F0F2F5]">
        <p className="font-medium text-grey-5">9:00 AM - 10:00 AM</p>
        <Button
          onClick={!started ? startSession : () => setIsModalOpen(true)}
          className="bg-primary-base laptop:block tablet:block phone:hidden text-sm py-2 text-white"
        >
          {started ? "Submit Session" : "Start Session"}
        </Button>
      </div>
      <div className="grid laptop:grid-cols-5 tablet:grid-cols-3 phone:grid-cols-1 gap-4 mt-2">
        <div className="laptop:col-span-4 tablet:col-span-2 phone:col-span-1">
          <SessionNote id={id as string} started={started} />
        </div>
        <div className="laptop:col-span-1 tablet:col-span-1 laptop:block tablet:block phone:hidden">
          <SessionAi />
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Heads up!"
        message="You're about to submit this session note, this action can not be reversed."
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success!"
        message="Notes submitted successfully"
      />
    </div>
  );
};
