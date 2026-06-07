type Props = {
  onViewReservations: () => void;
};

function ReservationSuccessModal({ onViewReservations }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-600 text-5xl text-green-600">
          ✓
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Reservation confirmed!
        </h2>

        <p className="mb-8 text-gray-600">
          Your parking spot has been successfully reserved.
        </p>

        <button
          onClick={onViewReservations}
          className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-600"
        >
          View my reservations
        </button>
      </div>
    </div>
  );
}

export default ReservationSuccessModal;
