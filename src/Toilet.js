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
 * Load toilets from json into array.
 * @param {*} toilets 
 */
export function loadToilets(toilets, map) {
   fetch("./toilets.json")
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

export function setToiletMarks(toilets, map) {
   toilets.forEach(toilet => {
      L.circleMarker([toilet.longitude, toilet.latitude],{
         renderer: renderedToilets
      }).addTo(map);
   });
}