<!DOCTYPE html>
<html lang="cz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Deník sráčů</title>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="https://api.mapy.cz/loader.js"></script>
	<script>Loader.load()</script>
</head>
<body>
    <header>
    
    </header>
    <section>
        <div id="mapa"></div>
        <script type="text/javascript">
            var stred = SMap.Coords.fromWGS84(14.41, 50.08);
            var mapa = new SMap(JAK.gel("mapa"), stred, 13);

            mapa.addDefaultLayer(SMap.DEF_BASE).enable();
            
            var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
            mapa.addControl(mouse);

            // responzivita mapy
            var sync = new SMap.Control.Sync({bottomSpace:30});
            mapa.addControl(sync);

            // pridani vrstvy znacek
            var layer = new SMap.Layer.Marker();
            mapa.addLayer(layer);
            layer.enable();

            // pridani znacky polohy uzivatele
            //var location = SMap.Coords.fromWGS84(14.41790, 50.12655);
            var options = {};
            var marker = new SMap.Marker(stred, "location", options);
            layer.addMarker(marker);

	    </script>
    
    </section>
    <footer>
        <div id="log"></div>
        <div id="lokace"></div>
    
    </footer>
</body>
</html>