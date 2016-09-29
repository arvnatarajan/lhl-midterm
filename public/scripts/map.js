let map;
let points;

let contentString = `
  <div id="content">
  <p>This is my content</p>
  </div>
`;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 43.65, lng: -79.36}
  });

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  $.get('/api/points')
    .then((result) => {
      result.forEach( (coord) => {
        let marker = new google.maps.Marker({
          position: newCoord,
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
