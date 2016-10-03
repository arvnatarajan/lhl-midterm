$( document ).ready(() => {

  //Submit Point - moved to map.js


  //Submit List

  $('#list-submit').on('click', (event) => {
    event.preventDefault();
      let data = {
        'title': $('#list-title').val(),
        'description': $('#list-description').val()
      }
      $(':input').val('');
      $.ajax({
        url: '/api/createlists',
        type: 'POST',
        data: data,
        success: () => {
          console.log('List added to database');
          $('.list-pill').removeClass('active');
          $(this).addClass('active');
          $('.list-body').hide();
          $('.point-body').show();
          $('#list-submit').hide();
          $('#modal-submit').show();
          $('.modal-list-drop').append(
        }
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
