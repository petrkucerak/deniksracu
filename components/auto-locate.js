import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function AutoLocate() {
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, map);

  return <></>;
}
