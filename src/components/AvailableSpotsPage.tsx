import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { create } from "../services";
import AvailableSpot from "./AvailableSpot";
import ParkingMap from "./ParkingMap";

function AvailableSpotsPage() {
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
    <section className="px-4 py-6">
      <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-screen  overflow-y-auto">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Available parking spaces
          </h1>
          <AvailableSpot spots={spot} />
        </div>

        {/* map */}
        <div className="h-150 w-full lg:sticky lg:top-6">
          <ParkingMap spots={spot} />
        </div>
      </div>
    </section>
  );
}

export default AvailableSpotsPage;
