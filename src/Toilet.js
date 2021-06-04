import { toiletIcon } from './CustomMarks.js';

/**
 * Definition of the toilet class.
 */
export class Toilet {
   constructor(longitude, latitude, name, yesNo, bonus, tweet) {
      this.longitude = longitude;
      this.latitude = latitude;
      this.name = name;
      this.yesNo = yesNo;
      this.bonus = bonus;
      this.tweet = tweet;
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
   // interate all toilets
   toilets.forEach(toilet => {
      // create custom popup
      let myPopUp = L.popup()
         .setContent(getToiletDetails(toilet));

      // create the toilet mark
      L.marker([toilet.longitude, toilet.latitude], {
         renderer: renderedToilets,
         icon: toiletIcon
      }).addTo(map).bindPopup(myPopUp);
   });
}

function getToiletDetails(toilet) {
   let str = ""
   str += `<h2> ${toilet.name} </h2>`;
   str += `<p>${toilet.tweet}</p>`;
   str += `<span>${toilet.longitude}N, ${toilet.latitude}E`;
   return str;
}