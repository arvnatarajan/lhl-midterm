let map;
let points;
let currentLat;
let currentLong;


let contentString = `
  <div id="content">
  <p>This is my content</p>
  </div>
`;


function geo_success(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  currentLat = position.coords.latitude;
  currentLong = position.coords.longitude
}
function geo_error() {
  alert("Sorry, no position available.");
}
var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 43.65, lng: -79.36}
  });
//{lat: 43.65, lng: -79.36}


  $.get('/api/points')
    .then((result) => {
      result.forEach( (coord) => {

        let numCoord = {
          lat: Number(coord.lat),
          lng: Number(coord.lng)
        }

        let infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        let marker = new google.maps.Marker({
          position: numCoord,
          map: map,
          title: 'Hello World!'
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
