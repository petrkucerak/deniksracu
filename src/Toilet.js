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
   str += `<div class="card"><h2> ${toilet.name} </h2>`;
   // normal category
   if(toilet.yesNo[0]) str += `<button class="category cistota">čistota</button>`;
   if(toilet.yesNo[1]) str += `<button class="category papir">toaletní papír</button>`;
   if(toilet.yesNo[2]) str += `<button class="category zamek">zámek na dveře</button>`;
   if(toilet.yesNo[3]) str += `<button class="category uyvadlo">umyvadlo</button>`;
   if(toilet.yesNo[4]) str += `<button class="category placene">placené</button>`;

   // special category
   if (toilet.bonus != "") {
      str += `<p><strong>Něco navíc:</strong> ${toilet.bonus}</p>`;
   }
   // other info
   str += `<p>${toilet.tweet}</p>`;
   str += `<span>${toilet.longitude}N, ${toilet.latitude}E</span></div>`;
   return str;
}