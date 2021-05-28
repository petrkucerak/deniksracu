<script context="module">
   import { error } from "console";

   // define global varibales
   let id, cordOptions;

   cordOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
   };

   /**
    * Function to get user cords
    */
   export function getCords() {
      console.log("User cords are");

      // create id vaiable to watching user location
      id = navigator.geolocation.watchPosition(
         cordSucess,
         cordError,
         cordOptions
      );

      function cordSucess(pos) {
         let crd = pos.coords;

         console.log("Latitude: " + crd.latitude);
         console.log("Longitude: " + crd.longitude);
      }

      function cordError(err) {
         console.warn("ERROR(" + err.code + "): " + err.message);
      }
   }
</script>
