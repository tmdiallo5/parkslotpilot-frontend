import { useContext, useState } from "react";
import { GlobalApplicationContext } from "../../context/GlobalApplicationContextProvider";
import { cancel, search, update } from "../../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../utils/date";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import ConfirmCancelReservationModal from "./ConfirmCancelReservationModal";
import StatusBadge from "./StatusBadge";

import EditReservationForm from "./EditReservationForm";

export type Reservation = {
  id: number;
  parkingName: string;
  parkingId: number;
  addressId: number;
  spotId: number;
  spotNumber: string;
  startDateTime: string;
  endDateTime: string;
  reservationStatus: string;
  cancelledAt: string;
  createdAt: string;
};

export type ReservationUpdateRequest = {
  spotId: number;
  startDateTime: string;
  endDateTime: string;
};

type UpdateMutationParams = {
  id: number;
  body: ReservationUpdateRequest;
};

function MyReservation() {
  const [cancelling, setCancelling] = useState<Reservation>();
  const [editReservation, setEditReservation] = useState<Reservation>();

  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: UpdateMutationParams) =>
      update({
        url: `update/${id}`,
        token,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reservations"],
      });
      setEditReservation(undefined);
    },
  });

  const cancelMutation = useMutation({
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
  console.log("The reservations:", reservations);

  const calculDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}min`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    return `${minutes}min`;
  };

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
                    <StatusBadge label={item.reservationStatus} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <CalendarTodayIcon fontSize="small" />
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(item.startDateTime)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <CalendarTodayIcon fontSize="small" />
                      <p className="text-sm text-gray-500">Until</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(item.endDateTime)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <AccessTimeIcon fontSize="small" />
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">
                        {calculDuration(item.startDateTime, item.endDateTime)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    {item.reservationStatus === "CONFIRMED" && (
                      <button
                        onClick={() => setCancelling(item)}
                        className="mt-6 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 "
                      >
                        Cancel reservation
                      </button>
                    )}
                    {item.reservationStatus === "CONFIRMED" && (
                      <button
                        onClick={() => setEditReservation(item)}
                        className="mt-6 rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 "
                      >
                        Edit reservation
                      </button>
                    )}
                  </div>

                  {item.reservationStatus === "CONFIRMED" && item.createdAt && (
                    <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm  bg-blue-100 text-blue-800">
                      Reserved on {formatDate(item.createdAt)}
                    </div>
                  )}

                  {item.reservationStatus === "CANCELLED" &&
                    item.cancelledAt && (
                      <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm  bg-red-100 text-red-800">
                        Cancelled on {formatDate(item.cancelledAt)}
                      </div>
                    )}
                  {item.reservationStatus === "COMPLETED" && (
                    <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm  bg-green-100 text-green-800">
                      Parking session completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {editReservation && (
        <EditReservationForm
          reservation={editReservation}
          onSave={(body) => {
            updateMutation.mutate({
              id: editReservation.id,
              body,
            });
          }}
          onClose={() => setEditReservation(undefined)}
        />
      )}
      {cancelling && (
        <ConfirmCancelReservationModal
          onConfirm={() => {
            cancelMutation.mutate(cancelling.id);
            setCancelling(undefined);
          }}
          onClose={() => setCancelling(undefined)}
          isLoading={cancelMutation.isPending}
        />
      )}
    </>
  );
}

export default MyReservation;
