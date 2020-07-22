$(document).ready(function(){

    mapa();
    getLocation();
    showPosition(position);

});


/**
 * Zjisteni lokace uzivatele
 */

/*var x=14.41;
var y=50.08;*/

var x=14.41442;
var y=50.36554;

 
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    $('#log').text("Prohlížeč nepodporuje lokaci");
  }
}
function showPosition(position) {
  y = position.coords.latitude;
  x = position.coords.longitude;
  $('#lokace').text("První souřadnice: " + x + " | Druhá souřadnice: " + y);
}

// hlavni mapa
function mapa(){
    var stred = SMap.Coords.fromWGS84(x, y);
    var mapa = new SMap(JAK.gel("mapa"), stred, 16);

    mapa.addDefaultLayer(SMap.DEF_BASE).enable();

    var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
    mapa.addControl(mouse);

    // responzivita mapy
    var sync = new SMap.Control.Sync({ bottomSpace: 30 });
    mapa.addControl(sync);

    // pridani vrstvy znacek
    var layer = new SMap.Layer.Marker();
    mapa.addLayer(layer);
    layer.enable();

    var znacka = JAK.mel("div");
    var obrazek = JAK.mel("img", { src: "assets/img/position.png" });
    znacka.appendChild(obrazek);

    // pridani znacky polohy uzivatele
    //var location = SMap.Coords.fromWGS84(14.41790, 50.12655);
    var options = { url: obrazek };
    var marker = new SMap.Marker(stred, "location", options);
    layer.addMarker(marker);

}