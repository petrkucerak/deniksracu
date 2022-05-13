import { useMap } from "react-leaflet";
import { locate } from "leaflet.locatecontrol"; // used, not removes

export default function MapSracLocation() {
  const map = useMap();
  L.control
    .locate({
      flyTo: true,
      showPopup: false,
      strings: {
        title: "Ukaž mi, kde jsem!",
      },
    })
    .addTo(map);
  return null;
}
