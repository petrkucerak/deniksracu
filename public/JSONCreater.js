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


function saveData(){

   if(document.getElementById('fLong').value == 50.0755 && document.getElementById('fLan').value == 14.4378){
      alert("Nezmenil jsi souradnice!");
      return;
   } 
   if (document.getElementById('fname').value == ""){
      alert("Napis jmeno mista!");
      return;
   }

   const name = document.getElementById('fname').value;
   const longtitude = document.getElementById('fLong').value;
   const latitude = document.getElementById('fLan').value;
   const yesNo1 = document.getElementById('fbollCistota').value;
   const yesNo2 = document.getElementById('fbollPapir').value;
   const yesNo3 = document.getElementById('fbollZamek').value;
   const yesNo4 = document.getElementById('fbollUmyvadlo').value;
   const yesNo5 = document.getElementById('fbollPlacene').value;
   const bonus = document.getElementById('fbonus').value;
   const tweet = document.getElementById('ftweet').value;

   const toilet = new Toilet(longtitude, latitude, name, [yesNo1, yesNo2, yesNo3, yesNo4, yesNo5], bonus, tweet);

   console.log(toilet);
}