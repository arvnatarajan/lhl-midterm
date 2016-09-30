$( document ).ready(() => {
  $('#modal-submit').on('click', (event) => {
    event.preventDefault();
    loc.getPosition( (pos) => {
      let data = {
        'lat': pos.lat,
        'lng': pos.lng,
        'title': $('#point-title').val(),
        'description': $('#point-description').val(),
        'picture': $('#point-picture').val(),
        'listid': $('.list-holder li').data("token")
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

  $(".point-pill").on('click', function(){
    $('.list-pill').removeClass('active');
    $(this).addClass('active');
    $('.list-body').hide();
    $('.point-body').show();
    $('#list-submit').hide();
    $('#modal-submit').show();
  })

  $(".list-pill").on('click', function(){
    $('.point-pill').removeClass('active');
    $(this).addClass('active');
    $('.point-body').hide();
    $('.list-body').show();
    $('#list-submit').show();
    $('#modal-submit').hide();

  })

});
