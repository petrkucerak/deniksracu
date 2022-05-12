import { MapConsumer, MapContainer, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import SracLocation from "../components/map-srac-location";

export default function Map() {
  return (
    <MapContainer
      center={[50.08061, 14.4101822]}
      zoom={16}
      scrollWheelZoom={true}
      className="w-screen h-screen"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
      />
      <SracLocation />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.76.0/dist/L.Control.Locate.min.css"
      />
    </MapContainer>
  );
}
