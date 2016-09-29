let map;
let icon ="";

const contentString = `
  <div id="content">
  <p>This is my content</p>
  </div>
`;

const infowindow = new google.maps.InfoWindow({
  content: contentString
});

const accessPoints = $.get('/api/points');

const iconBase = 'http://maps.google.com/mapfiles/ms/icons/';

const icons = {
  '1': {
    icon: iconBase + 'green.png'
  },
  '2': {
    icon: iconBase + 'blue.png'
  },
  '3': {
    icon: iconBase + 'red.png'
  },
  '4': {
    icon: iconBase + 'yellow.png'
  }
}

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

// const addInfoWindow = (result) => {
//   result.forEach((point) => {
//     point.addListener('click', () => {
//        infowindow.open(map, point);
//     });
//   });
// }

initMap();
// clearMarkers();
// addInfoWindow();

accessPoints.then((result) => {
  for (let i = 0; i < result.length; i++) {
    addMarker(result[i], i * 1000);
  }
})
.catch((err) => {
  console.log(err);
});
