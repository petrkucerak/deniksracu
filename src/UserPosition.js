
import {userIcon} from './CustomMarks.js';

/**
 * Display user positon on the map
 * @param {*} map 
 */
export function placeUserPosition(map) {
   // placeholders for the L.marker and L.circle representing user's current position and accuracy
   let current_position;

   function onLocationFound(e) {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (current_position) {
         map.removeLayer(current_position);
      }

      current_position = L.marker(e.latlng, {icon: userIcon})
         .addTo(map)
         .openPopup();
   }

   function onLocationError(e) {
      alert("Pro lepsi sluzby povol pristup k GPS\n(kod chyby: " + e.message + ")");
   }

   map.on("locationfound", onLocationFound);
   map.on("locationerror", onLocationError);

   // wrap map.locate in a function
   function locate() {
      map.locate({ setView: true, maxZoom: 20, enableHighAccuracy: true });
   }

   function updateUserPosition(){
      map.locate({ enableHighAccuracy: true });
   }

   // first time locate user
   locate();
   // call update user positon every 3 seconds... forever
   setInterval(updateUserPosition, 3000);
}