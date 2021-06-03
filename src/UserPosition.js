export function placeUserPosition(map) {
   // placeholders for the L.marker and L.circle representing user's current position and accuracy
   var current_position, current_accuracy;

   function onLocationFound(e) {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (current_position) {
         map.removeLayer(current_position);
         map.removeLayer(current_accuracy);
      }

      var radius = e.accuracy / 1;

      current_position = L.marker(e.latlng)
         .addTo(map)
         .bindPopup("You are within " + radius + " meters from this point")
         .openPopup();

      current_accuracy = L.circle(e.latlng, radius).addTo(map);
   }

   function onLocationError(e) {
      alert(e.message);
   }

   map.on("locationfound", onLocationFound);
   map.on("locationerror", onLocationError);

   // wrap map.locate in a function
   function locate() {
      map.locate({ setView: true, maxZoom: 16 });
   }

   // call locate every 3 seconds... forever
   setInterval(locate, 3000);
}