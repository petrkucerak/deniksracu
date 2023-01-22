import { useMap } from "react-leaflet";
export default function MapPicker() {
  const map = useMap();

  // ToDo: click handler to hold
  L.DomEvent.addListener(
    map,
    "click",
    (e) => {
      console.log("Click!");
      L.marker(e.latlng, { icon: poopIcon }).addTo(map);
    },
    this
  );
  return null;
}

const poopIcon = L.icon({
  iconUrl: "/asstes/icons/toilet-makrer-win/poop-win-32x32.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0],
});
