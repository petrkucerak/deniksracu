import { useMapEvent } from "react-leaflet";

export default function SracLocation() {
  const map = useMapEvent("click", () => {
    map.setView([50, 100]);
  });
  return null;
}

