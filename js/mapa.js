var vector = new ol.layer.Vector({
       source: new ol.source.Vector({
         url: 'https://openlayers.org/en/v4.6.5/examples/data/kml/2012-02-10.kml',
         format: new ol.format.KML()
       })
     });

var opmap = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'mapa',
        controls: ol.control.defaults({
          attributionOptions: {
            collapsible: false
          }
        }),
        view: new ol.View({
          center: [37.022484, -4.556063],
          zoom: 3
        })
      });
