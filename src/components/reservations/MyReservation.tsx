import { useContext } from "react";
import { GlobalApplicationContext } from "../../context/GlobalApplicationContextProvider";
import { search } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../utils/date";

type Reservation = {
  id: number;
  parkingName: string;
  spotNumber: string;
  startDateTime: string;
  endDateTime: string;
  reservationStatus: string;
};

function MyReservation() {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const { data: reservations } = useQuery<Reservation[]>({
    queryKey: ["my-reservations", token],
    queryFn: () => search({ url: "my-reservations", token }),
    enabled: !!token,
    retry: 2,
  });

  return (
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
                    <p className="mt-1 text-gray-500">Spot {item.spotNumber}</p>
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

                <button className="mt-6 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700">
                  Cancel reservation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReservation;
