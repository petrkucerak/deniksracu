import { useMapEvent } from "react-leaflet";

export default function SracLocation() {
  const map = useMapEvent("click", () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        map.flyTo([crd.latitude, crd.longitude]);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
      }
    );

    // map.setView([50, 100]);
  });
  return null;
}
