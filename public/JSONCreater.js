/**
 * Definition of the toilet class.
 */
 class Toilet {
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
 * Save data into the class structure
 * @returns 
 */
function saveData(){

   if(document.getElementById('fLong').value == 50.0755 && document.getElementById('fLan').value == 14.4378){
      alert("Nezmenil jsi souradnice!");
      return;
   } 
   if (document.getElementById('fname').value == ""){
      alert("Napis jmeno mista!");
      return;
   }

   let name = document.getElementById('fname').value;
   let longtitude = document.getElementById('fLong').value;
   let latitude = document.getElementById('fLan').value;
   let yesNo1 = document.getElementById('fbollCistota').checked;
   let yesNo2 = document.getElementById('fbollPapir').checked;
   let yesNo3 = document.getElementById('fbollZamek').checked;
   let yesNo4 = document.getElementById('fbollUmyvadlo').checked;
   let yesNo5 = document.getElementById('fbollPlacene').checked;
   let bonus = document.getElementById('fbonus').value;
   let tweet = document.getElementById('ftweet').value;

   let toilet = new Toilet(longtitude, latitude, name, [yesNo1, yesNo2, yesNo3, yesNo4, yesNo5], bonus, tweet);

   console.log(JSON.stringify(toilet));
   let date = new Date();
   let fileName = date.getTime();
   downloadObjectAsJson(toilet, fileName);
}

/**
 * Download data as a JSON.
 * @param {*} exportObj 
 * @param {*} exportName 
 */
function downloadObjectAsJson(exportObj, exportName){
   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
   var downloadAnchorNode = document.createElement('a');
   downloadAnchorNode.setAttribute("href",     dataStr);
   downloadAnchorNode.setAttribute("download", exportName + ".json");
   document.body.appendChild(downloadAnchorNode); // required for firefox
   downloadAnchorNode.click();
   downloadAnchorNode.remove();
 }