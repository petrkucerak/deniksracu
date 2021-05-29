<script context="module">
   import { error } from "console";
import App from "./App.svelte";
import MapUtilities, { setMapToLoaction } from "./MapUtilities.svelte";

   // define global varibales
   let id, cordOptions;
   
   /**
    * Object represent user Locations
    */
   let userLocation = {
      latitude: null,
      longitude: null,
      
      /**
       * The method set cords
       * @param latit
       * @param long
       */
      setUserLocation: function(latit, long){
         this.latitude = latit;
         this.longitude = long;
         console.log("The cords has been set.")
         console.log(this.latitude + " " + this.longitude);

         setMapToLoaction(latit, long);
      },

      /**
       * The method return user cords
       */
      getUserLocation: function(){
         return [this.latitude, this.longitude];
      }
   };

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

      // create the id vaiable to watching user location
      id = navigator.geolocation.watchPosition(
         cordSucess,
         cordError,
         cordOptions
      );

      function cordSucess(pos) {
         let crd = pos.coords;

         // to save cords into object
         userLocation.setUserLocation(crd.latitude, crd.longitude);
      }

      function cordError(err) {
         console.warn("ERROR(" + err.code + "): " + err.message);
      }
   }
</script>
