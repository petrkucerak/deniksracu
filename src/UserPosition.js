/**
 * Display user positon on the map
 * @param {*} map 
 */
export function placeUserPosition(map) {
   // placeholders for the L.marker and L.circle representing user's current position and accuracy
   let current_position, current_accuracy;

   function onLocationFound(e) {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (current_position) {
         map.removeLayer(current_position);
         map.removeLayer(current_accuracy);
      }

      let radius = e.accuracy / 1;

      current_position = L.marker(e.latlng)
         .addTo(map)
         .openPopup();
   }

   function onLocationError(e) {
      alert(e.message);
   }

   map.on("locationfound", onLocationFound);
   map.on("locationerror", onLocationError);

   // wrap map.locate in a function
   function locate() {
      map.locate({ setView: true, maxZoom: 20 });
   }

   function updateUserPosition(){

   }

   // first time locate user
   locate();
   // call update user positon every 3 seconds... forever
   setInterval(updateUserPosition, 3000);
}