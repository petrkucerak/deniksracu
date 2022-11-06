import { useMap } from "react-leaflet";

const url = `/toilets/toilets-unsorted.json`;

export default function MapToilets() {
  const map = useMap();

  fetch(url)
    .then((res) => res.json())
    .then((toilets) => {
      for (let id = 0; id < toilets.length; id += 1) {
        // prepare the category string
        let category = `<ul class="">`;
        if (toilets[id].isClean) category += "<li>čisto</li>";
        if (toilets[id].hasPaper) category += "<li>toaleťák</li>";
        if (toilets[id].canLock) category += "<li>zamykatelné</li>";
        if (toilets[id].hasWater) category += "<li>tekoucí voda</li>";
        if (toilets[id].isFree) category += "<li>zdarma</li>";
        for (let i = 0; i < toilets[id].bonusCategory.length; i += 1) {
          category += `<li>${toilets[id].bonusCategory[i]}</li>`;
        }
        category += "</ul>";

        // prepare the way description string
        let wayDescriptionString = "";
        if (toilets[id].wayDescription !== "")
          wayDescriptionString = `
        <div>
          <h3 class="text-xl font-semibold mt-2">Jak se na místo dostat</h3>
          <p class="!my-0">${toilets[id].wayDescription}<p>
        </div>
        `;

        // prepare the comment string
        let commentString = "";
        if (toilets[id].comment !== "")
          commentString = `
        <div>
          <h3 class="text-xl font-semibold mt-2">Komentář</h3>
          <p class="!my-0">${toilets[id].comment}<p>
        </div>
        `;

        //prepare date string
        let date = new Date(toilets[id].timeStamp);
        const dateString = `${date.getDate()}. ${
          date.getMonth() + 1
        }. ${date.getFullYear()} v ${date.getHours()}:${date.getMinutes()}`;

        // prepare the output string
        const string = `
          <div class="text-lg">
            <h2 class="text-2xl font-semibold">${toilets[id].placeName}</h2>
            
            <div class="font-mono text-base">
              <span>${toilets[id].latitude}</span>
              <span>${toilets[id].longtitude}</span>
            </div>
            
            <span>${toilets[id].toiletType}</span>
            ${category}
            ${wayDescriptionString}
            ${commentString}
            <p class="text-base">${dateString} přidal ${toilets[id].nickName}<p>
          </div>
        `;

        // render card
        const toiletPopup = L.popup({
          keepInView: true,
          offset: L.point(15, 0),
          autoPanPadding: L.point(0, 0),
          closeButton: false,
          className: "w-screen bottom-0",
        }).setContent(string);

        L.marker([toilets[id].latitude, toilets[id].longtitude], {
          icon: toiletIcon,
          title: toilets[id].placeName,
          alt: `Ikona typu ${toilets[id].toiletType}`,
        })
          .addTo(map)
          .bindPopup(toiletPopup)
          .on("click", (e) => {
            console.log(e);
          });
      }
    })
    .catch((err) => console.log(err));

  return null;
}

const toiletIcon = L.icon({
  iconUrl: "/asstes/icons/toilet-makrer-win/marker-toilet-win-32x32.png",
  iconSize: [32, 32],
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
  // shadowUrl: "/asstes/icons/marker-toilet-48x84-transparent-shadows.svg",
  // shadowSize: [28.79, 50.4],
  // shadowAnchor: [2.3945, 4.19999],
});
