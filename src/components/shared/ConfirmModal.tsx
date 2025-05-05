import { SvgIcon } from "./SvgIcon";

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
        role="button"
        aria-label="Close modal"
      />
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
        <div className="flex items-center  bg-[#FEF6E7] rounded-full p-2 w-fit mx-auto justify-center mb-4">
          <SvgIcon name="warning" width={24} height={24} fill="#F3A218" />
        </div>
        <h2 className="text-base text-center font-semibold mb-4">{title}</h2>
        <p className="mb-6 text-center text-grey-5 text-sm">{message}</p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-full bg-white text-gray-800 rounded-md hover:bg-gray-100 drop-shadow-[0_0_8px_#1018280D]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 w-full bg-primary-base text-white rounded-md hover:bg-opacity-80"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
