import { useContext, useState } from "react";
import { GlobalApplicationContext } from "../../context/GlobalApplicationContextProvider";
import { cancel, search } from "../../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../utils/date";

import ConfirmCancelReservationModal from "./ConfirmCancelReservationModal";

type Reservation = {
  id: number;
  parkingName: string;
  spotNumber: string;
  startDateTime: string;
  endDateTime: string;
  reservationStatus: string;
  cancelledAt: string;
};

function MyReservation() {
  const [cancelling, setCancelling] = useState<Reservation>();

  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) =>
      cancel({
        url: `cancel/${id}`,
        token,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reservations"],
      });
    },
  });

  const { data: reservations } = useQuery<Reservation[]>({
    queryKey: ["my-reservations", token],
    queryFn: () => search({ url: "my-reservations", token }),
    enabled: !!token,
    retry: 2,
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white px-8 py-6">
          <div className="h-1 w-24 rounded-full bg-green-700 mb-4" />

          <h1 className="text-3xl font-bold text-gray-900">My reservations</h1>

          <p className="mt-1 text-gray-500">
            {reservations?.length ?? 0} reservations found
          </p>
        </div>

        <div className="px-8 py-8">
          {!reservations || reservations.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-gray-600 shadow">
              You have no reservations yet.
            </div>
          ) : (
            <div className="grid gap-5">
              {reservations.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {item.parkingName}
                      </h2>
                      <p className="mt-1 text-gray-500">
                        Spot {item.spotNumber}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                      {item.reservationStatus}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(item.startDateTime)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">Until</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(item.endDateTime)}
                      </p>
                    </div>
                  </div>
                  {item.reservationStatus === "CONFIRMED" && (
                    <button
                      onClick={() => setCancelling(item)}
                      className="mt-6 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
                    >
                      Cancel reservation
                    </button>
                  )}
                  {item.reservationStatus === "CANCELLED" &&
                    item.cancelledAt && (
                      <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm text-gray-600">
                        Cancelled on{formatDate(item.cancelledAt)}
                      </div>
                    )}
                  {item.reservationStatus === "COMPLETED" && (
                    <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm text-gray-600">
                      Parking session completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {cancelling && (
        <ConfirmCancelReservationModal
          onConfirm={() => {
            mutation.mutate(cancelling.id);
            setCancelling(undefined);
          }}
          onClose={() => setCancelling(undefined)}
          isLoading={mutation.isPending}
        />
      )}
    </>
  );
}

export default MyReservation;
