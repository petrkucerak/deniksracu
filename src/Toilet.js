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

export function loadToilets(toilets) {
   fetch("./toilets.json")
      .then(response => {
         return response.json();
      })
      .then(data => { 
         toilets.push(data);
      });
}