let map;
let points;
let currentLat;
let currentLong;
let contentString;

let icon ='';

const icons = {
  '1': {
    icon: '../images/bed.png'
  },
  '2': {
    icon: '../images/cart.png'
  },
  '3': {
    icon: '../images/music.png'
  },
  '4': {
    icon: '../images/restaurant.png'
  },
  '5': {
    icon: '../images/theater.png'
  },
  '6': {
    icon: '../images/football.png'
  },
  '7': {
    icon: '../images/picture.png'
  },
  '8': {
    icon: '../images/park.png'
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


const postPointToDB = (point) => {
  $('#modal-submit').on('click', (event) => {
    event.preventDefault();
    let data = {
      'lat': point.lat,
      'lng': point.lng,
      'title': $('#point-title').val(),
      'description': $('#point-description').val(),
      'picture': $('#point-picture').val(),
      'listid': $('.list-holder li').data("token")
    }
    $(':input').val('');
    $('#myModal').modal('toggle');
    $.ajax({
      url: '/api/createpoints',
      type: 'POST',
      data: data,
      success: () => {
        console.log('Point added to database');
      }
    })
  })
}

const showModal = () => {
  $('#myModal').modal('show');
}

$(document).ready(function() {
  loc.initLocationProcedure();

  $.get('/api/points')
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          addMarker(result[i], i * 200);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  google.maps.event.addListener(map, 'click', function(event) {
    if ($('#edit-map').hasClass('insert-mode')) {
      let newPoint = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      addMarker(newPoint, 200);
      setTimeout(showModal, 1000);
      postPointToDB(newPoint);

    }
  });
});
