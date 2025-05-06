import { api } from "./api";

export const postNote = async (payload: {
  note: string;
  bookingId: string;
  voice: boolean;
  type: string;
}) => {
  const response = await api.post("/process/add_notes", payload);
  return response;
};
export const submitNotes = async (payload: {
  notes: string;
  period: string;
}) => {
  const response = await api.post("/process/submit_notes", payload);
  return response;
};

export const getNotes = async (bookingId: string) => {
  const response = await api.get(`/process/get_notes/${bookingId}`);
  return response;
};

export const getQuestions = async (bookingId: string) => {
  const response = await api.get(`/process/get_questions/${bookingId}`);
  return response;
};
