import { formatDate } from "../../utils/date";
import type { AvailableSpotType } from "../AvailableSpot";
import { X } from "lucide-react";

type Props = {
  spot: AvailableSpotType;
  onClose: () => void;
  onConfirm: () => void;
};

function ConfirmReservationModal({ spot, onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Confirm your reservation</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <p>
            <strong>Parking:</strong> {spot.parkingName}
          </p>
          <p>
            <strong>Spot:</strong> {spot.number}
          </p>
          <p>
            <strong>Type:</strong> {spot.spotType}
          </p>
          <p>
            <strong>From:</strong> {formatDate(spot.from)}
          </p>
          <p>
            <strong>Until:</strong> {formatDate(spot.until)}
          </p>
          <p>
            <strong>Price:</strong> {spot.priceHour} €/h
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-600"
          >
            Confirm reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmReservationModal;
