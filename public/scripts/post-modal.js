$( document ).ready(()=>{
  $("#modal-submit").on('click', (event)=>{
    let data = {
      'lat': 43.65,
      'lng': -79.36,
      'title': $('#point-title').val(),
      'description': $('#point-description').val(),
      'picture': $('#point-picture').val(),
      'listid': $('.list-holder li').data("token")
    }

    $.ajax({
        url: "/api/createpoints",
        type: "POST",
        data: data,
        success: ()=>{
          console.log('success');
        }})
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
