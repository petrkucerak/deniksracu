/**
 * Custom icon for user position
 */
export let userIcon = L.icon({
   iconUrl: './img/cowboy.png',

   iconSize: [38, 38], // size of the icon
   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
   shadowAnchor: [4, 62],  // the same for the shadow
   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});