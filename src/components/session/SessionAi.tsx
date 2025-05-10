import { Note } from "../../types";

export const SessionAi = ({ data }: { data: Note[] }) => {
  return (
    <div className="max-h-[70vh] overflow-y-auto relative border-l mt-3 border-[#EBF0F4]">
      <h3 className="text-base py-4 border-b  border-grey-1 font-medium text-[#2C2F3A]">
        <span className="px-3">Stretch-Lab Ai Assistance</span>
      </h3>
      <div className="py-4 px-2">
        <div className="text-sm text-grey-5">
          {data.length === 0 ? (
            "No notes yet"
          ) : (
            <div className="flex flex-col gap-3">
              {data.map(
                (note, index) =>
                  note.note.length > 0 && (
                    <div key={index} className="bg-[#F4FAFB] py-5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#00AAFF] drop-shadow-[0_0_4px_#00AAFFCC] rounded-full w-4 h-4" />
                        <p className="text-sm text-dark-1 font-medium">
                          Ai Suggested Questions
                        </p>
                      </div>
                      <ul className="list-disc list-inside gap-1 flex flex-col mt-3">
                        {(note.note as string[]).map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
