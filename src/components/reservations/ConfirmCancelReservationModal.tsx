type Props = {
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

function ConfirmCancelReservationModal({
  onConfirm,
  onClose,
  isLoading,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">Cancel reservation</h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to cancel your reservation?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            No
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading ? "Cancelling..." : "Yes, cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCancelReservationModal;
