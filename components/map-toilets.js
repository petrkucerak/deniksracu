import { useMap } from "react-leaflet";

const url = `public/toilets/toilets-unsorted.json`;

export default async function MapToilets() {
  const map = useMap();
  const res = await fetch(url);
  const toilets = await res.json();
  console.log(toilets);

  return null;
}
