let loc = {
  'error': (error) => {
    alert("The current position could not be found!");
  },
  'setCurrentPosition': (pos) => {
    loc.currentPositionMarker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
      title: "Current Position"
    });

    //AN: Pans to current position marker
    map.panTo(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
  },
  //AN: Watches current position, and refreshes if user moves location
  // 'watchCurrentPosition': () => {
  //   let positionTimer = navigator.geolocation.watchPosition(
  //     function (position) {
  //       loc.setMarkerPosition(loc.currentPositionMarker, position);
  //     }
  //   );
  // },
  //AN: Sets current position and watches it
  'displayAndWatch': (position) => {
    loc.setCurrentPosition(position);
    // loc.watchCurrentPosition();
  },
  //AN: Sets marker at current position
  setMarkerPosition: (marker, position) => {
    marker.setPosition(
      new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude)
      );
  },
  //AN: begins location tracking
  initLocationProcedure: () => {
    initMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loc.displayAndWatch, loc.error);
    } else {
      alert("Your browser does not support the Geolocation API!");
    }
  },
  getPosition: (callback) => {
    console.log('Searching for location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        callback(pos);
      }, loc.error);

    } else {
      // Browser doesn't support Geolocation
      alert("Your browser does not support the Geolocation API!");
    }
  }
}
