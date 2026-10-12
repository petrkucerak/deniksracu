import { useMap } from "react-leaflet";
import { locate } from "leaflet.locatecontrol";

export default function SracLocation() {
  const map = useMap();
  const locateControl = L.control
    .locate({
      flyTo: false,
      showPopup: false,
      strings: {
        title: "Ukaž mi, kde jsem!",
      },
      locateOptions: {
        enableHighAccuracy: true,
      },
    })
    .addTo(map);
  locateControl.start();
  return null;
}
