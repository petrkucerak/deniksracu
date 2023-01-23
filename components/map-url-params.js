import { useRouter } from "next/router";
import { useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";

export default function MapURLParams() {
  const route = useRouter();
  // console.log(route);

  const [location, setLocation] = useState(() => {
    const { lng, lat, zoom } = route.query;
    return { lng: lng, lat: lat, zoom: zoom };
  });
  // zoomend
  const map = useMapEvent("dragend zoomend", (e) => {
    const z = e.target.getZoom();
    const c = e.target.getCenter();
    console.log("onMoveEnd", z, c);
    // setLocation({
    //   lng: c.lng,
    //   lat: c.lat,
    //   zoom: z,
    // });
    route.push(`?lat=${c.lat}&lng=${c.lng}&zoom=${z}`, undefined, {
      shallow: true,
    });
    map.setView([c.lat, c.lng], z);
  });

  return null;
}
