let map;

let points = [
  {lat: -25.3110, lng: 131.1110},
  {lat: -25.3111, lng: 131.1111},
  {lat: -25.3112, lng: 131.1112}
];

let contentString = `
  <div id="content">
    <p>This is my content</p>
  </div>
    `;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: -25.311, lng: 131.111}
  });

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  points.forEach( (coord) => {
    let marker = new google.maps.Marker({
      position: coord,
      map: map,
      title: 'Hello World!'
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
}
