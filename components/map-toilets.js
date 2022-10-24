import { useMap } from "react-leaflet";

const url = `public/toilets/toilets-unsorted.json`;

export default function MapToilets() {
  const map = useMap();
  const res = fetch(url);
  const toilets = res.json();
  console.log(toilets);

  return null;
}
