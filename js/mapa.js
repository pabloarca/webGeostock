(function (win, doc) {
	
  var vector = new ol.layer.Vector({
       source: new ol.source.Vector({
         url: 'https://openlayers.org/en/v4.6.5/examples/data/kml/2012-02-10.kml',
         format: new ol.format.KML()
       })
     });
  var olview = new ol.View({
	    projection: 'EPSG:4326',
        center: [-4.564217, 37.021046],
        zoom: 8,
        minZoom: 8,
        maxZoom: 20,
		extent: [-7.891840, 36.164198, -1.948437, 38.400444]
      }),
	  
      baseLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      mapa = new ol.Map({
        target: doc.getElementById('mapa'),
        view: olview,
        layers: [baseLayer],
		controls: [				
				new ol.control.Zoom()
				],	
      }),
      popup = new ol.Overlay.Popup();

  //Instantiate with some options and add the Control
  var geocoder = new Geocoder('nominatim', {
    provider: 'photon',
    targetType: 'text-input',
    lang: 'es',
    placeholder: 'Buscar ...',
    limit: 5,
    keepOpen: false
  });

  mapa.addControl(geocoder);
  mapa.addOverlay(popup);

  //Listen when an address is chosen
  geocoder.on('addresschosen', function (evt) {
    window.setTimeout(function () {
      popup.show(evt.coordinate, evt.address.formatted);
    }, 3000);
  });

<<<<<<< HEAD
})(window, document);
=======
})(window, document);
>>>>>>> 6b365a9aef7ea6b2a7c97d04a2fc7d3872ee9386
