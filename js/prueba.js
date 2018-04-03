      var projection = ol.proj.get('EPSG:3857');

      var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

      var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'file:///C:/Users/Usuario/Documents/GitHub/webGeostock.github.io/kml/ciza.kml',
          format: new ol.format.KML()
        })
      });

      var map = new ol.Map({
        layers: [raster, vector],
        target: document.getElementById('mapa'),
        view: new ol.View({
          center: [-492326.599008, 4399345.864186],
          projection: projection,
          zoom: 10
        })
      });
      var displayFeatureInfo = function(pixel) {
        var features = [];
        map.forEachFeatureAtPixel(pixel, function(feature) {
          features.push(feature);
        });
        if (features.length > 0) {
          var info = [];
          var i, ii;
          for (i = 0, ii = features.length; i < ii; ++i) {
            info.push(features[i].get('name'));
          }
          document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
          map.getTarget().style.cursor = 'pointer';
        } else {
          document.getElementById('info').innerHTML = '&nbsp;';
          map.getTarget().style.cursor = '';
        }
      };

      map.on('pointermove', function(evt) {
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });

      map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
      });
