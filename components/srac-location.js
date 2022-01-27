import { useMapEvent } from "react-leaflet";

export default function SracLocation() {
  const map = useMapEvent("click", () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 17);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
      }
    );
  });
  return null;
}
