$(document).ready(function(){

    getLocation();
    showPosition(position);

});


/**
 * Zjisteni lokace uzivatele
 */

 var x=0;
 var y=0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    $('#log').text("Prohlížeč nepodporuje lokaci");
  }
}
function showPosition(position) {
  $('#lokace').text(position.coords.latitude + " " + position.coords.longitude);
  x=position.coords.latitude;
  y=position.coords.longitude;
}