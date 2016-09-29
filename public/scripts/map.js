let map;
let points;
let currentLat;
let currentLong;
let contentString = `
  <div id="content">
  <p>This is my content</p>
  </div>
`;

let geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};
let icon ="";

const iconBase = 'http://maps.google.com/mapfiles/';

const icons = {
  '1': {
    icon: iconBase + 'kml/pal2/icon4.png'
  },
  '2': {
    icon: iconBase + 'kml/pal2/icon19.png'
  },
  '3': {
    icon: iconBase + 'kml/pal2/icon32.png'
  },
  '4': {
    icon: iconBase + 'kml/pal4/icon38.png'
  }
}

const geo_success = (position) => {
  console.log(`Current Position: ${position.coords.latitude} ${position.coords.longitude}`);
  currentLat = position.coords.latitude;
  currentLong = position.coords.longitude;
}

const geo_error = () => {
  alert("Sorry, no position available.");
}

const wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

const infowindow = new google.maps.InfoWindow({
  content: contentString
});

const accessPoints = $.get('/api/points');


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 43.65, lng: -79.36}
  });
}

const addMarker = (point, timeout) => {

  window.setTimeout(() => {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(Number(point.lat), Number(point.lng)),
      map: map,
      animation: google.maps.Animation.DROP,
      icon: icons[point['list_id']].icon
    });
  }, timeout);
}

// const clearMarkers = (result) => {
//   for (var i = 0; i < result.length; i++) {
//     result[i].setMap(null);
//   }
//   result = [];
// }

const addInfoWindow = (point) => {
  point.addListener('click', () => {
     infowindow.open(map, point);
  });
}

initMap();
// clearMarkers();
// addInfoWindow();

accessPoints.then((result) => {
  for (let i = 0; i < result.length; i++) {
    addMarker(result[i], i * 200);
  }
})
.catch((err) => {
  console.log(err);
});
