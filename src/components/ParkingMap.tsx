import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { AvailableSpotType } from "./AvailableSpot";

type Props = {
  spots: AvailableSpotType[];
};

function ParkingMap({ spots }: Props) {
  const firstSPost = spots[0];

  const center: [number, number] = firstSPost
    ? [firstSPost.latitude, firstSPost.longitude]
    : [53.0793, 8.8017];

  return (
    <MapContainer
      center={center}
      zoom={14}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Marker key={spot.spotId} position={[spot.latitude, spot.longitude]}>
          <Popup>
            <div className="space-y-1">
              <h3 className="font-bold">{spot.parkingName}</h3>

              <p>Spot: {spot.number}</p>

              <p>{spot.priceHour} €/h</p>

              <p>{spot.address}</p>

              <button className="rounded bg-green-700 px-3 py-1 text-white">
                Reserve
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ParkingMap;
