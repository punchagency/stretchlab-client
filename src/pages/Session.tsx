import { useNavigate, useParams } from "react-router";
import { Header, SessionAi, SessionNote } from "../components/session";
import {
  Button,
  ConfirmModal,
  FullLoader,
  SuccessModal,
} from "../components/shared";
import logo from "../assets/images/stretchlab.png";
import { useEffect, useState } from "react";
import { getNotes, submitNotes } from "../service/session";
import { ApiError, Note, Booking, NoteResponse } from "../types";
import { getBookings } from "../service/dashboard";
import { getUserCookie } from "../utils/user";
export const Session = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate("/dashboard");
  }
  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [session, setSession] = useState<Booking | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [aiNotes, setAiNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await getNotes(id as string);
      if (response.status === 200) {
        const reversedNotes = response.data.notes.sort(
          (a: NoteResponse, b: NoteResponse) =>
            new Date(a.createdTime).getTime() -
            new Date(b.createdTime).getTime()
        );
        setNotes(
          reversedNotes.map((note: NoteResponse) => ({
            id: note.id,
            note:
              note.fields.type === "user"
                ? note.fields.Note
                : JSON.parse(note.fields.Note),
            time: new Date(note.createdTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            voice: note.fields.Voice === "False" ? false : true,
            type: note.fields.type,
            error: false,
          }))
        );
        setAiNotes(
          reversedNotes
            .filter(
              (note: { fields: { type: string } }) =>
                note.fields.type === "assistant"
            )
            .map((note: NoteResponse) => ({
              id: note.id,
              note: JSON.parse(note.fields.Note),
              time: note.createdTime,
              voice: note.fields.Voice === "False" ? false : true,
              type: note.fields.type,
              error: false,
            }))
        );
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeSession = async () => {
    const getCookie = getUserCookie();
    try {
      setIsLoading(true);
      const response = await getBookings(getCookie as string);
      if (response.status === 200) {
        const session = response.data.bookings.find(
          (booking: Booking) => booking.booking_id === id
        );
        setSession(session);
        await fetchNotes();
      } else {
        setError(true);
      }
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.response?.status !== 401) {
        setError(true);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    initializeSession();
  }, []);

  const handleConfirm = async () => {
    setSubmitError(false);
    const noteText = notes
      .filter((note) => note.type === "user")
      .map((note) => note.note)
      .join("\n\n");

    try {
      setLoading(true);
      const response = await submitNotes({
        notes: noteText,
        period: session?.event_date as string,
      });
      if (response.status === 200) {
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      console.error(error);
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  const startSession = () => {
    setStarted(true);
  };

  if (isLoading) {
    return <FullLoader text="Initializing session..." />;
  }
  if (error) {
    return (
      <div className="h-[70vh] grid place-items-center">
        <div>
          <p className="text-grey-2 font-semibold text-2xl text-center">
            An Error Occured
          </p>
          <p className="text-grey-5 text-base">
            An error occured when initializing session. Please try again
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={initializeSession}
              className="bg-primary-base mx-auto py-2 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <img
          src={logo}
          alt="logo"
          className="laptop:hidden phone:hidden tablet:block w-24 h-10 mb-4"
        />
      </div>
      <Header
        handleClick={!started ? startSession : () => setIsModalOpen(true)}
        started={started}
        client_name={session?.client_name || ""}
      />
      <div className="phone:flex laptop:hidden tablet:hidden gap-8 mt-6 items-center">
        <h3 className="text-dark-1 laptop:hidden tablet:hidden phone:block font-semibold text-xl">
          {session?.client_name} Session
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
        <p className="font-medium text-grey-5">{session?.event_date}</p>
        <Button
          onClick={!started ? startSession : () => setIsModalOpen(true)}
          className="bg-primary-base laptop:block tablet:block phone:hidden text-sm py-2 text-white"
        >
          {started ? "Submit Session" : "Start Session"}
        </Button>
      </div>
      <div className="grid laptop:grid-cols-5 tablet:grid-cols-3 phone:grid-cols-1 gap-4 mt-2">
        <div className="laptop:col-span-4 tablet:col-span-2 phone:col-span-1">
          <SessionNote
            setAiNotes={setAiNotes}
            notes={notes}
            setNotes={setNotes}
            id={id as string}
            started={started}
          />
        </div>
        <div className="laptop:col-span-1 tablet:col-span-1 laptop:block tablet:block phone:hidden">
          <SessionAi data={aiNotes} />
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        error={submitError}
        loading={loading}
        title="Heads up!"
        message="You're about to submit this session note, this action can not be reversed."
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate("/dashboard");
        }}
        title="Success!"
        message="Notes submitted successfully"
      />
    </div>
  );
};
