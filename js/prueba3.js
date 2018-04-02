var defaultStyle = {
        'Point': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(255,255,0,0.5)'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: '#ff0',
              width: 1
            })
          })
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#f00',
            width: 3
          })
        }),
        'Polygon': new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0,255,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#0ff',
            width: 1
          })
        }),
        'MultiPoint': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(255,0,255,0.5)'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: '#f0f',
              width: 1
            })
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#0f0',
            width: 3
          })
        }),
        'MultiPolygon': new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0,0,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#00f',
            width: 1
          })
        })
      };

      var styleFunction = function(feature, resolution) {
        var featureStyleFunction = feature.getStyleFunction();
        if (featureStyleFunction) {
          return featureStyleFunction.call(feature, resolution);
        } else {
          return defaultStyle[feature.getGeometry().getType()];
        }
      };

      var dragAndDropInteraction = new ol.interaction.DragAndDrop({
        formatConstructors: [
          ol.format.GPX,
          ol.format.GeoJSON,
          ol.format.IGC,
          ol.format.KML,
          ol.format.TopoJSON
        ]
      });

      var map = new ol.Map({
        interactions: ol.interaction.defaults().extend([dragAndDropInteraction]),
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'mapa',
        view: new ol.View({
          center: [0, 0],
          zoom: 2
        })
      });

      dragAndDropInteraction.on('addfeatures', function(event) {
        var vectorSource = new ol.source.Vector({
          features: event.features
        });
        map.addLayer(new ol.layer.Vector({
          renderMode: 'image',
          source: vectorSource,
          style: styleFunction
        }));
        map.getView().fit(vectorSource.getExtent());
      });

      var info = $('#info');
        info.tooltip({
          animation: false,
          trigger: 'manual'
        });

        var displayFeatureInfo = function(pixel) {
          info.css({
            left: pixel[0] + 'px',
            top: (pixel[1] - 15) + 'px'
          });
          var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
          });
          if (feature) {
            info.tooltip('hide')
                .attr('data-original-title', feature.get('name'))
                .tooltip('fixTitle')
                .tooltip('show');
          } else {
            info.tooltip('hide');
          }
        };

        map.on('pointermove', function(evt) {
          if (evt.dragging) {
            info.tooltip('hide');
            return;
          }
          displayFeatureInfo(map.getEventPixel(evt.originalEvent));
        });

        map.on('click', function(evt) {
          displayFeatureInfo(evt.pixel);
        });
