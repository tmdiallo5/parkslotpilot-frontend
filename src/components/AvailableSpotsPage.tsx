import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { create } from "../services";

import ParkingMap from "./ParkingMap";
import { useContext, useState } from "react";
import { GlobalApplicationContext } from "../context/GlobalApplicationContextProvider";

import ConfirmReservationModal from "./reservations/ConfirmReservationModal";
import ReservationSuccessModal from "./reservations/ReservationSuccessModal";
import type { AvailableSpotType } from "./AvailableSpot";
import AvailableSpot from "./AvailableSpot";

function AvailableSpotsPage() {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const [selectedSpot, setSelectedSpot] = useState<AvailableSpotType | null>(
    null,
  );
  const [showSuccess, setShowSuccess] = useState(false);

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
  const handleReserve = (spot: AvailableSpotType) => {
    if (!token) {
      navigate("/login");
      return;
    }

    setSelectedSpot(spot);
  };

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const addressId = searchParams.get("addressId");
  const startDateTime = searchParams.get("startDateTime");
  const endDateTime = searchParams.get("endDateTime");

  const { data: spot = [] } = useQuery({
    queryKey: ["available-spot", addressId, startDateTime, endDateTime],

    queryFn: async () => {
      const request = {
        addressId: addressId,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      };
      const response = await create({
        url: "available-spot",
        body: request,
      });
      return response.data;
    },
    enabled: !!addressId && !!startDateTime && !!startDateTime,
    retry: 2,
  });

  return (
    <>
      <section className="px-4 py-6">
        <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-screen  overflow-y-auto">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              Available parking spaces
            </h1>
            <AvailableSpot spots={spot} onReserve={handleReserve} />
          </div>

          {/* map */}
          <div className="h-150 w-full lg:sticky lg:top-6">
            <ParkingMap spots={spot} onReserve={handleReserve} />
          </div>
        </div>
      </section>
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

export default AvailableSpotsPage;
