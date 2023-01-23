import { MapConsumer, MapContainer, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import SracLocation from "../components/map-srac-location";
import MapToilets from "../components/map-toilets";
import MapPicker from "./map-picker";
import MapURLParams from "./map-url-params";
import { useRouter } from "next/router";
import { parseParamsFloat, parseParamsInt } from "../lib/utils";

export default function Map() {
  const route = useRouter();
  const { lat, lng, zoom } = route.query;
  const query = route.query;

  let startLat = 50.08061;
  let startLng = 14.4101822;
  if(query.lat != null) startLat = parseParamsFloat(query.lat);
  if(query.lng != null) startLng = parseParamsFloat(query.lng);

  return (
    <MapContainer
      center={[startLat, startLng]}
      zoom={16}
      scrollWheelZoom={true}
      className="w-screen h-screen diseable-map-selection"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
      />
      <SracLocation />
      <MapToilets />
      <MapPicker />
      <MapURLParams />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.76.0/dist/L.Control.Locate.min.css"
      />
    </MapContainer>
  );
}
