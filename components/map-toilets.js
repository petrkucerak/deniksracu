import { useMap } from "react-leaflet";

const url = `/toilets/toilets-unsorted.json`;

export default function MapToilets() {
  const map = useMap();

  fetch(url)
    .then((res) => res.json())
    .then((toilets) => {
      for (let id = 0; id < toilets.length; id += 1) {
        const toiletPopup = L.popup({
          keepInView: true,
          closeButton: false,
          className: "",
        }).setContent(`
          <div class="text-lg">
            <h2 class="text-2xl font-semibold">${toilets[id].placeName}</h2>
            <span class="font-mono text-base">${toilets[id].latitude}; ${toilets[id].longtitude}</span>
            <div>
              ${toilets[id].bonusCategory}
            </div>
            <p>${toilets[id].comment}<p>
          </div>
        `);

        L.marker([toilets[id].latitude, toilets[id].longtitude], {
          icon: toiletIcon,
        })
          .addTo(map)
          .bindPopup(toiletPopup);
      }
    })
    .catch((err) => console.log(err));

  return null;
}

const toiletIcon = L.icon({
  iconUrl: "/asstes/icons/marker-toilet-48x84-transparent.png",
  iconSize: [24, 42],
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
  shadowUrl: "/asstes/icons/marker-toilet-48x84-transparent-shadows.svg",
  shadowSize: [28.79, 50.4],
  shadowAnchor: [2.3945, 4.19999],
});
