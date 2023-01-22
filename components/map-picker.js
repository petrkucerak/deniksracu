import { useMap } from "react-leaflet";
export default function MapPicker() {
  const map = useMap();

  // ToDo: click handler to hold
  L.DomEvent.addListener(
    map,
    "click",
    (e) => {
      console.log("Click!");
      L.marker(e.latlng).addTo(map);
    },
    this
  );
  return null;
}
