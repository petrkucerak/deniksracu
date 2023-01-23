import { useMap } from "react-leaflet";
export default function MapPicker() {
  const map = useMap();

  // ToDo: click handler to hold
  L.DomEvent.addListener(
    map,
    "contextmenu",
    (e) => {
      console.log("Click!");
      L.marker(e.latlng, { icon: poopIcon }).addTo(map).bindPopup(poopPopUp);
    },
    this
  );
  return null;
}

const poopIcon = L.icon({
  iconUrl: "/asstes/icons/toilet-makrer-win/poop-win-32x32.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0],
});

const newToilteIntro = [
  "Sralo se ti tu dobře?",
  "Jaké tu bylo tůnění?",
  "Doporučil bys to tu?",
];

const string = `
<div class="text-lg px-4 py-5">
  <div>${
    newToilteIntro[Math.floor(Math.random() * newToilteIntro.length)]
  }</div>
  <a><button class="
    text-sm
    rounded-xl
    bg-yellow-500
    w-full
    py-2 px-2
    mt-1
    text-white
    font-bold
    uppercase
    hover:bg-yellow-600
    duration-200"
  >přidat nový trůn</button></a>
</div>
`;

const poopPopUp = L.popup({
  keepInView: true,
  offset: L.point(0, 0),
  autoPanPadding: L.point(15, 15),
  closeButton: false,
  className: "",
}).setContent(string);
