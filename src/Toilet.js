import { toiletIcon } from './CustomMarks.js';

/**
 * Definition of the toilet class.
 */
export class Toilet {
   constructor(longitude, latitude) {
      this.longitude = longitude;
      this.latitude = latitude;
   }
}
/**
 * Includes list of all toilets
 */
export let toilets = [];

export let renderedToilets = L.canvas({ padding: 0.5 });

/**
 * Load toilets from JSON into array.
 * @param {*} toilets 
 * @param {*} map 
 */
export function loadToilets(toilets, map) {
   fetch("./assets/toilets.json")
      .then(response => {
         return response.json();
      })
      .then(data => {
         data.forEach(toilet => {
            toilets.push(toilet);
            setToiletMarks(toilets, map);
         })
      });
}
/**
 * Render toilet marks into the map.
 * @param {*} toilets 
 * @param {*} map 
 */
export function setToiletMarks(toilets, map) {
   toilets.forEach(toilet => {
      L.marker([toilet.longitude, toilet.latitude], {
         renderer: renderedToilets,
         icon: toiletIcon
      }).addTo(map).bindPopup("Hura trunit");
   });
}