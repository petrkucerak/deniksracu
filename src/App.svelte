<script>
   // import app variables

   import L from "leaflet";

   // define global varibales

   let map;

   // inti view Prague
   const initialView = [50.0755, 14.4378];
   function createMap(container) {
      let m = L.map(container, { preferCanvas: true }).setView(initialView, 14);
      L.tileLayer(
         "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
         {
            attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
		  &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
            subdomains: "abcd",
            maxZoom: 20,
         }
      ).addTo(m);

      return m;
   }

   /**
    * The main map function
    * @param container
    */
   function mapAction(container) {

      map = createMap(container);

      return {
         destroy: () => {
            map.remove();
            map = null;
         },
      };
   }

   /**
    * Function run if user resize windows
    */
   function resizeMap() {
      if (map) {
         map.invalidateSize();
      }
   }
</script>

<svelte:window on:resize={resizeMap} /><link
   rel="stylesheet"
   href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""
/>

<div class="map" use:mapAction />
<button id="addNewPoint" class="homeButton">➕</button>
<button id="profile" class="homeButton">🧻</button>
