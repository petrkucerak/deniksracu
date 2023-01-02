import { useMap } from "react-leaflet";

export default function MapLayersControl() {

   // TODO: https://leafletjs.com/examples/layers-control/
  const map = useMap();
  L.control.layers().addTo(map);
  return null;
}
