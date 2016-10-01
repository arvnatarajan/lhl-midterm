let map;
let points;
let currentLat;
let currentLong;
let contentString;

let icon ='';

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

const initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 43.65, lng: -79.36},
    mapTypeControl: false,
    streetViewControl: false
  });
}


const infowindow = new google.maps.InfoWindow({
  content: `<div id="content">
              <p>this is my content, can't figure out how to put point info in this box</p>
            </div>
          `
});

const addMarker = (point, timeout) => {
  window.setTimeout(() => {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(Number(point.lat), Number(point.lng)),
      map: map,
      animation: google.maps.Animation.DROP,
      icon: (icons[point['list_id']] || {}).icon
    });

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  });
}

$(document).ready(function() {
  loc.initLocationProcedure();

  $.get('/api/points')
      .then((result) => {
        console.log(result);
        for (let i = 0; i < result.length; i++) {
          addMarker(result[i], i * 200);
        }
      })
      .catch((err) => {
        console.log(err);
      });
});
