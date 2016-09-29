let map;
let points;
let currentLat;
let currentLong;
let contentString = `
  <div id="content">
  <p>This is my content</p>
  </div>
`;

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

// initMap();
// clearMarkers();
// addInfoWindow();


$(document).ready(function() {
  accessPoints.then((result) => {
    for (let i = 0; i < result.length; i++) {
      addMarker(result[i], i * 200);
    }
  })
  .catch((err) => {
    console.log(err);
  });

  loc.initLocationProcedure();
});
