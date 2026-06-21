import { useContext, useState } from "react";
import { GlobalApplicationContext } from "../context/GlobalApplicationContextProvider";
import { useMutation } from "@tanstack/react-query";
import { create } from "../services";
import { useNavigate } from "react-router";
import ConfirmReservationModal from "./reservations/ConfirmReservationModal";
import ReservationSuccessModal from "./reservations/ReservationSuccessModal";
import { formatDate } from "../utils/date";

export type AvailableSpotType = {
  spotId: number;
  number: string;
  spotType: string;
  parkingName: string;
  priceHour: number;
  latitude: number;
  longitude: number;
  address: string;
  imageUrl: string;
  startDateTime: string;
  endDateTime: string;
};

type Props = {
  spots: AvailableSpotType[];
};

function AvailableSpot({ spots }: Props) {
  const [selectedSpot, setSelectedSpot] = useState<AvailableSpotType | null>(
    null,
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const mutation = useMutation({
    mutationFn: (spot: AvailableSpotType) =>
      create({
        url: "reservation",
        token,
        body: {
          spotId: spot.spotId,
          startDateTime: spot.startDateTime,
          endDateTime: spot.endDateTime,
        },
      }),

    onSuccess: () => {
      setSelectedSpot(null);
      setShowSuccess(true);
    },
  });

  return (
    <>
      <div className="mt-6 space-y-4">
        {spots.map((spot) => (
          <div
            key={spot.spotId}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            {spot.imageUrl && (
              <img
                src={spot.imageUrl}
                alt={spot.parkingName}
                className="mb-4 h-48 w-full rounded-xl object-cover"
              />
            )}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {spot.parkingName}
                </h2>

                <p className="mt-1 text-sm text-gray-500">{spot.address}</p>
              </div>

              <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {spot.priceHour} €/h
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-gray-500">Spot Number</p>
                <p className="font-semibold text-gray-900">{spot.number}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-gray-500">Type</p>
                <p className="font-semibold text-gray-900">{spot.spotType}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-green-100 bg-green-50 p-3 text-sm">
              <p className="font-medium text-green-800">Available</p>

              <p className="mt-1 text-green-700">
                From {formatDate(spot.startDateTime)} until{" "}
                {formatDate(spot.endDateTime)}
              </p>
            </div>

            <button
              onClick={() => {
                {
                  if (!token) {
                    navigate("/login");
                    return;
                  }
                  setSelectedSpot(spot);
                }
              }}
              className="mt-5 w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              Reserve spot
            </button>
          </div>
        ))}
      </div>
      {selectedSpot && (
        <ConfirmReservationModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
          onConfirm={() => mutation.mutate(selectedSpot)}
        />
      )}

      {showSuccess && (
        <ReservationSuccessModal
          onViewReservations={() => navigate("/private/reservation")}
        />
      )}
    </>
  );
}

export default AvailableSpot;
