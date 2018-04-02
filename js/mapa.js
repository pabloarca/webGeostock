
'use strict;'
if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL. This app supports Safari 9 and above, Microsoft Edge 13 and above, along with the latest version of Chrome and Firefox');
}
else {
  mapboxgl.accessToken = 'pk.eyJ1IjoicGVpeCIsImEiOiJjaWx3YnpyMGMwMGEwdm1tNWJ1YXd5YXl6In0.0FwWZ0igmG3sCeC48IESQQ';
  var filterGroup = document.getElementById('filter-group');
  const center_point = [-4.421482086181641, 36.72120508210904],
        bounds = [
            [-4.514179229736328,
            36.67667990169817],
            [-4.3526458740234375,
            36.75043865214185]
        ]
        
        map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
          center: center_point, // starting position [lng, lat]
          maxBounds: bounds,
          zoom: 10,
          maxzoom: 18,
          minzoom: 10
        }),
        navigation = new mapboxgl.NavigationControl(),
        geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }),
        geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          /*
          Limit the results to Spain
          */
          country: 'es',
          /*
          Apply the same bbox to the geocoder to limit results to this area
          */
          bbox: bounds.reduce(
            ( accumulator, currentValue ) => accumulator.concat(currentValue),[]
          )
        });

  /*
  Initialize the map controls
  */
  map.addControl(navigation);
  map.addControl(geolocate);
  map.addControl(geocoder, 'top-left');

  /*
  Initilize the map
  */
  map.on('load', function () {
    /*
    Fit view to bbox
    */
    map.fitBounds(bounds);
    /*
    Add all the sources to the map.
    */
 
    /*
    Change the cursor to a pointer when the it hovers the location layer
    */
    map.on('mouseenter', 'action-points', () => {
      map.getCanvas().style.cursor = 'pointer'
    });

    /*
    Change it back to a pointer when it leaves.
    */
    map.on('mouseleave', 'action-points', () => {
      map.getCanvas().style.cursor = ''
    });
  });
};


      
      
