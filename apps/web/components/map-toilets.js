import { useMap } from "react-leaflet";
import {
  toiletTypes,
  toiletIcons,
  freeIcon,
  paperIcon,
  waterIcon,
  clearIcon,
  keyIcon,
  bonusIcon,
} from "./toilet-types";

const url = `/toilets/toilets-unsorted.json`;

export default function MapToilets() {
  const map = useMap();

  fetch(url)
    .then((res) => res.json())
    .then((toilets) => {
      for (let id = 0; id < toilets.length; id += 1) {
        // prepare the category string
        let category = `<ul class="svg-non-block">`;
        if (toilets[id].isClean)
          category += `<li class="rounded text-red-600">${clearIcon}čisto</li>`;
        if (toilets[id].hasPaper)
          category += `<li class="rounded text-gray-500">${paperIcon}toaleťák</li>`;
        if (toilets[id].canLock)
          category += `<li class="rounded text-green-500">${keyIcon}zamykatelné</li>`;
        if (toilets[id].hasWater)
          category += `<li class="rounded text-blue-400">${waterIcon}tekoucí voda</li>`;
        if (toilets[id].isFree)
          category += `<li class="rounded text-yellow-500">${freeIcon}zdarma</li>`;
        for (let i = 0; i < toilets[id].bonusCategory.length; i += 1) {
          category += `<li class="text-gray-500">${bonusIcon}${toilets[id].bonusCategory[i]}</li>`;
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

        // prepare the palce type
        let toiletType = `<span class="center">`;
        if (toilets[id].toiletType === toiletTypes[0])
          toiletType += `${toiletIcons[0]}`;
        if (toilets[id].toiletType === toiletTypes[1])
          toiletType += `${toiletIcons[1]}`;
        if (toilets[id].toiletType === toiletTypes[2])
          toiletType += `${toiletIcons[2]}`;
        if (toilets[id].toiletType === toiletTypes[3])
          toiletType += `${toiletIcons[3]}`;
        if (toilets[id].toiletType === toiletTypes[4])
          toiletType += `${toiletIcons[4]}`;
        if (toilets[id].toiletType === toiletTypes[5])
          toiletType += `${toiletIcons[5]}`;
        if (toilets[id].toiletType === toiletTypes[6])
          toiletType += `${toiletIcons[6]}`;
        toiletType += `</span>`;

        //prepare date string
        let date = new Date(toilets[id].timeStamp);
        const dateString = `${date.getDate()}. ${
          date.getMonth() + 1
        }. ${date.getFullYear()} v ${date.getHours()}:${date.getMinutes()}`;

        // prepare the output string
        const string = `
          <div class="text-lg">
            <div class="rounded-t-[12px] pt-5 w-full pb-5 px-4 bg-[#af8566ff] text-white">
              <h2 class="text-2xl font-semibold">${toilets[id].placeName}</h2>
              <div class="absolute left-0 w-full flex flex-col items-center">
                <div class="rounded-full relative top-[-.5rem] p-2 bg-[#af8566ff]">
                  ${toiletType}
                </div>
              </div>
            </div>
            <div class="m-4 mt-10">
              ${category}
              ${wayDescriptionString}
              ${commentString}
              <p class="text-base">${dateString} přidal ${toilets[id].nickName}<p>
            </div>
          </div>
        `;

        // render card
        const toiletPopup = L.popup({
          keepInView: true,
          offset: L.point(15, 0),
          autoPanPadding: L.point(15, 15),
          closeButton: false,
          className: "",
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
