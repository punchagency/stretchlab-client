import { formattedNote } from "../../types";

export const SessionAi = ({
  data,
  setEdit,
  started,
}: {
  data: formattedNote | null;
  setEdit: (edit: string) => void;
  started: boolean;
}) => {
  return (
    <div className="max-h-[70vh] overflow-y-auto relative border-l mt-3 border-[#EBF0F4]">
      <h3 className="text-base py-4 border-b  border-grey-1 font-medium text-[#2C2F3A]">
        <span className="px-3">StretchLab Assistant</span>
      </h3>
      <div className="py-4 px-2">
        <div className="text-sm text-grey-5">
          {!data ? (
            "No notes yet"
          ) : (
            <div className="relative">
              <button
                disabled={!started}
                onClick={() =>
                  setEdit(
                    data.notes
                      .map((note) =>
                        Object.entries(note)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join("\n")
                      )
                      .join("\n\n")
                  )
                }
                className="absolute right-2 -top-10 text-xs disabled:opacity-50 disabled:cursor-not-allowed text-blue-500 cursor-pointer"
              >
                Click to edit
              </button>

              {data.notes.map((note) =>
                Object.entries(note).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                    <br />
                    <br />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
