import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { sracLocation } from "../lib/location/srac-location";

export default function Map() {
  const { latitude, longitude, error } = sracLocation();
  console.log(latitude, longitude, error);
  return (
    <MapContainer
      center={[50.08061, 14.4101822]}
      zoom={20}
      scrollWheelZoom={false}
      className="w-screen h-screen"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      
    </MapContainer>
  );
}
