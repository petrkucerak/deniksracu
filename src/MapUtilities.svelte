<script>
/**
 * Function set map to current location.
 * @param latit
 * @param long
 */
   export function setMapToLoaction(latit, long) {
      const cords = [latit, long];
      let m = L.map(container, { preferCanvas: true }).setView(cords, 14);
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
</script>
