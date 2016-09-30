$( document ).ready(() => {
  $('#modal-submit').on('click', (event) => {
    event.preventDefault();

    loc.getPosition( (pos) => {
      let data = {
        'lat': pos.lat,
        'lng': pos.lng,
        'title': $('#point-title').val(),
        'description': $('#point-description').val(),
        'picture': $('#point-picture').val()
      }

      $.ajax({
        url: '/api/createpoints',
        type: 'POST',
        data: data,
        success: () => {
          console.log('Point added to database');
        }
      })
    })
  })
});
