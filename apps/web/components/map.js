import { MapConsumer, MapContainer, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import SracLocation from "../components/map-srac-location";
import MapToilets from "../components/map-toilets";
import MapPicker from "./map-picker";
import { isMobile } from "react-device-detect";

export default function Map() {
  const API_KEY = "0pDMFK05UmFV-CqGrkNGlwvIIquKNNSwUaFxI2ZLXQo";
  let tileSize = "";
  isMobile ? (tileSize = "256@2x") : tileSize = "256";
  return (
    <MapContainer
      center={[50.08061, 14.4101822]}
      zoom={16}
      scrollWheelZoom={true}
      className="w-screen h-screen diseable-map-selection"
    >
      <TileLayer
        url={`https://api.mapy.cz/v1/maptiles/outdoor/${tileSize}/{z}/{x}/{y}?apikey=${API_KEY}`}
        attribution='<a href="https://api.mapy.cz/copyright" target="_blank" rel="noreferrer">&copy; Seznam.cz a.s. a další</a>'
      />
      <SracLocation />
      <MapToilets />
      <MapPicker />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.76.0/dist/L.Control.Locate.min.css"
      />
      <a
        href="http://mapy.cz/"
        target="_blank"
        rel="noreferrer"
        className="absolute z-[1000] bottom-0"
      >
        <img alt="Mapy.cz logo" src="https://api.mapy.cz/img/api/logo.svg" />
      </a>
    </MapContainer>
  );
}
