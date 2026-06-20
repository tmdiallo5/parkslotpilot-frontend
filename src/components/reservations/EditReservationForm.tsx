import { useMutation } from "@tanstack/react-query";
import type { Reservation, ReservationUpdateRequest } from "./MyReservation";

import { useContext, useState } from "react";
import { GlobalApplicationContext } from "../../context/GlobalApplicationContextProvider";
import { search } from "../../services";
import { formatDate } from "../../utils/date";

type Props = {
  reservation: Reservation;
  onSave: (body: ReservationUpdateRequest) => void;
  onClose: () => void;
};

export type AvailableSpot = {
  spotId: number;
  spotNumber: string;
  spotType: string;
  spotStatus: string;
};

function EditReservationForm({ reservation, onSave, onClose }: Props) {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const [reservationUpdateForm, setReservationUpdateForm] =
    useState<ReservationUpdateRequest>({
      spotId: reservation.spotId,
      startDateTime: reservation.startDateTime,
      endDateTime: reservation.endDateTime,
    });
  const [spots, setSpots] = useState<AvailableSpot[]>([]);
  const [checked, setChecked] = useState(false);

  const handleSpotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReservationUpdateForm({
      ...reservationUpdateForm,
      spotId: Number(e.target.value),
    });
  };

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationUpdateForm({
      ...reservationUpdateForm,
      startDateTime: e.target.value,
    });
  };
  const handleUntil = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationUpdateForm({
      ...reservationUpdateForm,
      endDateTime: e.target.value,
    });
  };

  const availableSpot = useMutation<AvailableSpot[]>({
    mutationFn: () =>
      search({
        url: `available-spot/${reservation.parkingId}?startDateTime=${reservationUpdateForm.startDateTime}&endDateTime=${reservationUpdateForm.endDateTime}&currentReservationId=${reservation.id}`,
        token,
      }),

    onSuccess: (data) => {
      setSpots(data);
      setChecked(true);
      console.log("====================================");
      console.log("the available Spot:", data);
      console.log("====================================");
    },
  });

  const calculDurationUpdate = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMs = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0 && hours > 0) {
      return `${days} days ${hours} hours`;
    }
    if (days > 0) {
      return `${days} days`;
    }
    return `${hours}h ${minutes}min`;
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Edit reservation
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              x
            </button>
          </div>

          <div className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">
            You can update your reservation before it starts.
          </div>

          <div className="space-y-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Parking
              </label>
              <p className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700">
                {reservation.parkingName}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Spot
              </label>

              <select
                onChange={handleSpotChange}
                value={reservationUpdateForm.spotId}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700"
              >
                {spots.length > 0 ? (
                  spots.map((spot) => (
                    <option key={spot.spotId} value={spot.spotId}>
                      {spot.spotNumber} - {spot.spotType}
                    </option>
                  ))
                ) : (
                  <option value={reservationUpdateForm.spotId}>
                    {reservation.spotNumber}
                  </option>
                )}
              </select>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  From (start time)
                </label>
                <input
                  onChange={handleFrom}
                  value={reservationUpdateForm.startDateTime}
                  type="datetime-local"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Until (end time)
                </label>
                <input
                  onChange={handleUntil}
                  value={reservationUpdateForm.endDateTime}
                  type="datetime-local"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700"
                />
              </div>
            </div>
            <button
              onClick={() => availableSpot.mutate()}
              className="w-full mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Check available spots
            </button>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">Reservation summary</p>
              <p className="mt-1 text-sm font-semibold text-green-600">
                {calculDurationUpdate(
                  reservationUpdateForm.startDateTime,
                  reservationUpdateForm.endDateTime,
                )}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                From {formatDate(reservationUpdateForm.startDateTime)} to{" "}
                {formatDate(reservationUpdateForm.endDateTime)}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                disabled={!checked}
                onClick={() => {
                  console.log("reservationUpdateForm =", reservationUpdateForm);
                  onSave(reservationUpdateForm);
                }}
                className={`rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 ${
                  checked
                    ? "bg-green-600 hover:bg-green-700"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReservationForm;
