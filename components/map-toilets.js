import { useMap } from "react-leaflet";

const url = `/toilets/toilets-unsorted.json`;

export default function MapToilets() {
  const map = useMap();

  fetch(url)
    .then((res) => res.json())
    .then((toilets) => {
      for (let id = 0; id < toilets.length; id += 1) {
        // prepare hte category string
        let category = "<div>";
        if (toilets[id].isClean) category += "<span>čisto</span>";
        if (toilets[id].hasPaper) category += "<span>toaleťák</span>";
        if (toilets[id].canLock) category += "<span>zamykatelné</span>";
        if (toilets[id].hasWater) category += "<span>tekoucí voda</span>";
        if (toilets[id].isFree) category += "<span>zdarma</span>";
        for (let i = 0; i < toilets[id].bonusCategory.length; i += 1) {
          category += `<span>${toilets[id].bonusCategory[i]}</span>`;
        }
        category += "</div>";

        //prepare date string
        let date = new Date(toilets[id].timeStamp);
        console.log(date);
        const dateString = `${date.getDate()}. ${
          date.getMonth() + 1
        }. ${date.getFullYear()} v ${date.getHours()}:${date.getMinutes()}`;

        // prepare the output string
        const string = `
          <div class="text-lg">
            <h2 class="text-2xl font-semibold">${toilets[id].placeName}</h2>
            <span class="font-mono text-base">${toilets[id].latitude}; ${toilets[id].longtitude}</span>
            <span>${toilets[id].toiletType}</span>
            ${category}
            <p>${toilets[id].wayDescription}<p>
            <p>${toilets[id].comment}<p>
            <p>${dateString} přidal ${toilets[id].nickName}<p>
          </div>
        `;

        // render card
        const toiletPopup = L.popup({
          keepInView: true,
          closeButton: false,
          className: "",
        }).setContent(string);

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
