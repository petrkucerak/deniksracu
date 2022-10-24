import { useMap } from "react-leaflet";

const url = `/toilets/toilets-unsorted.json`;

export default function MapToilets() {
  const map = useMap();

  fetch(url)
    .then((res) => res.json())
    .then((toilets) => {
      for (let id = 0; id < toilets.length; id += 1) {
        console.log(toilets[id]);
        L.marker([toilets[id].latitude, toilets[id].longtitude], {
          icon: toiletIcon,
        }).addTo(map);
      }
    })
    .catch((err) => console.log(err));

  return null;
}

const toiletIcon = L.icon({
  iconUrl: "/asstes/icons/marker-toilet-48x84-transparent.png",
  iconSize: [48, 84],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
