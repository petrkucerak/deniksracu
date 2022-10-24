import { useMap } from "react-leaflet";

const url = `public/toilets/toilets-unsorted.json`;

export default function MapToilets() {
  const map = useMap();

  fetch(url)
    .then((res) => res.json())
    .then((toilets) => {
      console.log(toilets);
    })
    .catch((err) => console.log(err));

  console.log("Map functions!");

  return null;
}
