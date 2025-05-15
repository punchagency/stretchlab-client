import { SvgIcon } from "../shared";
import emptyNote from "../../assets/images/emptynotes.png";
// import io from "socket.io-client";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { getQuestions, postNote } from "../../service/session";
import { v4 as uuidv4 } from "uuid";
import {
  Note,
  SpeechRecognition,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionEvent,
  formattedNote,
} from "../../types";

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const SessionNote = ({
  setAiNotes,
  edit,
  id,
  started,
  notes,
  setNotes,
}: {
  setAiNotes: (notes: formattedNote) => void;
  id: string;
  started: boolean;
  notes: Note[];
  edit: string;
  setNotes: (notes: Note[] | ((prevNotes: Note[]) => Note[])) => void;
}) => {
  const [transcript, setTranscript] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [microphoneAccessState, setMicrophoneAccessState] =
    useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState(true);
  const notesContainerRef = useRef<HTMLDivElement | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicrophoneAccessState(true);
    } catch (err) {
      console.error("Microphone access denied or not available:", err);
      setMicrophoneAccessState(false);
      alert("Please allow microphone access to use this voice note.");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    if (!recognitionRef.current) return;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    let finalTranscript = "";

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop =
        notesContainerRef.current.scrollHeight;
    }
  }, [notes]);

  useEffect(() => {
    if (edit) {
      setTranscript(edit);
    }
  }, [edit]);

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  // useEffect(() => {
  //   socket.on("transcript", (data: { text: string; is_final: boolean }) => {
  //     setTranscript(data.text);
  //     if (data.is_final) {
  //       console.log("Final transcript:", data.text);
  //     }
  //   });

  //   return () => {
  //     socket.off("transcript");
  //   };
  // }, []);

  const startRecording = async () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRetry = async (id: string) => {
    setIsSending(true);
    try {
      const data = notes.find((note) => note.id === id);
      const response = await postNote({
        note: data?.note as string,
        voice: data?.voice as boolean,
        type: "user",
        bookingId: id as string,
      });
      if (response.status === 201) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                }
              : note
          )
        );
        handleAnalyze();
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };
  const handleSendMessage = async () => {
    if (transcript.trim() === "") {
      return;
    }
    setIsSending(true);
    const newNoteId = uuidv4();
    try {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: newNoteId,
          note: transcript,
          time: "sending...",
          voice: false,
          error: false,
          type: "user",
        },
      ]);
      const response = await postNote({
        note: transcript,
        voice: false,
        bookingId: id as string,
        type: "user",
      });
      if (response.status === 201) {
        setNotes((prevNotes) =>
          prevNotes.map((note) => {
            if (note.id === newNoteId) {
              return {
                ...note,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
            }
            return note;
          })
        );
        setTranscript("");
        handleAnalyze();
      } else {
        setNotes((prevNotes) =>
          prevNotes.map((note) => {
            if (note.id === newNoteId) {
              return {
                ...note,
                error: true,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
            }
            return note;
          })
        );
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.id === newNoteId) {
            return {
              ...note,
              error: true,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          }
          return note;
        })
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await getQuestions(id as string);

      if (response.status === 200) {
        setNotes((prevNotes) => [
          ...prevNotes,
          {
            id: uuidv4(),
            note: response.data.questions.questions,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: "assistant",
            voice: false,
            error: false,
          },
        ]);
        setAiNotes(response.data.formatted_notes);
      }
    } catch (err) {
      console.error("Error analyzing notes:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full  relative">
      <h3 className="text-base py-4 border-b border-grey-1 font-medium text-[#2C2F3A]">
        Session Notes
      </h3>
      {notes.length === 0 ? (
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
      ) : (
        <div
          ref={notesContainerRef}
          className="flex flex-col gap-6 py-4 overflow-y-auto laptop:max-h-[60vh] tablet:max-h-[65vh] phone:max-h-[60vh] pb-24"
        >
          {notes.map((note, index) => (
            <div
              className={`flex flex-col ${
                note.type === "user" ? "items-end" : "items-start"
              }`}
              key={index}
            >
              <div
                className={`text-sm  rounded-lg max-w-full w-fit ${
                  note.type == "user"
                    ? "bg-primary-light text-[#475367]"
                    : note.note.length > 0
                    ? "bg-[#F3A21840] text-dark-1"
                    : "bg-primary-base text-white"
                } p-4`}
              >
                {note.type === "user" ? (
                  note.note
                ) : note.note.length > 0 ? (
                  <ul className="list-disc list-inside gap-1 flex flex-col">
                    {(note.note as string[]).map(
                      (item: string, index: number) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-sm">
                    No Questions. This is a quality note, go ahead and submit
                    your session
                  </p>
                )}
              </div>
              {!note.error ? (
                <div>
                  {note.time !== "sending..." ? (
                    <p>
                      <span className="mr-1 text-[#2C2F3A] font-semibold text-xs">
                        {note.type === "user" ? "Flexologist" : "Assistant"}
                      </span>
                      <span className="text-xs text-grey-5">{note.time}</span>
                    </p>
                  ) : (
                    <p className="text-xs text-grey-5 italic">Sending...</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-xs text-red-500">Error sending message</p>
                  <button
                    className="text-xs text-red-500"
                    onClick={() => handleRetry(note.id)}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-center gap-1 animate-pulse">
                <div className="bg-[#ED3833] drop-shadow-[0_0_4px_#ED383330] rounded-full w-4 h-4" />
                <p className="text-sm text-grey-5 ">Analysing Notes...</p>
              </div>
              <div className="bg-[#F0F2F5] rounded-xl h-3 animate-pulse" />
              <div className="bg-[#F0F2F5] rounded-xl h-3 w-[70%] animate-pulse" />
              <div className="bg-[#F0F2F5] rounded-xl h-3 w-[40%] animate-pulse" />
            </div>
          )}
        </div>
      )}
      <div className="fixed bottom-0  laptop:left-8 tablet:left-5 phone:left-2 laptop:w-[76%] tablet:w-[63%] phone:w-[95%]">
        <div className="flex items-center gap-3 justify-end mb-4">
          {isRecording && (
            <div className="flex items-center animate-pulse gap-1">
              <div className="bg-[#0F973D] drop-shadow-[0_0_4px_#00FF1ACC] rounded-full w-2 h-2" />
              <p className="text-xs text-grey-5 italic">Listening...</p>
            </div>
          )}
          <button
            disabled={
              !microphoneAccessState || !started || isSending || !isSupported
            }
            className={`${
              !isRecording ? "bg-primary-secondary" : "bg-[#FDEBEB]"
            } rounded-full disabled:opacity-50 disabled:cursor-not-allowed p-2`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <SvgIcon name="stop" width={27} height={27} fill="#D42620" />
            ) : (
              <SvgIcon
                name="microphone"
                width={27}
                height={27}
                fill="#368591"
              />
            )}
          </button>
        </div>
        <div className="py-4 bg-white">
          <div className="flex items-center gap-2 bg-neutral-quaternary p-4 border rounded-2xl border-neutral-quaternary">
            <textarea
              disabled={!started || isSending}
              placeholder="Click microphone or type your notes ..."
              onChange={(e) => setTranscript(e.target.value)}
              value={transcript}
              className="w-full bg-transparent resize-none outline-none text-sm text-[#58617B] placeholder:text-[#58617B] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              disabled={!started || isSending}
              onClick={() => handleSendMessage()}
              className="px-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SvgIcon name="send" width={14} height={14} fill="#7E8AAD" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
