
$(document).ready(() => {

/*
  $('.listBox').on('click', (event) => {
    event.preventDefault();

      $.ajax({
        url: '/api/postlike',
        type: 'POST',
        data: data,
        success: () => {
          console.log('Like added to database');
        }
      })
    })

*/

// changes the color of the heart by adding 'liked' class
    $(".glyphicon-heart-empty").on("click", function(){
        console.log('liked')
        $(".glyphicon-heart-empty").toggleClass("liked");
    });


$(".glyphicon-heart-empty").on("click", function(){
   /* console.log($(this).data('likeid'));*/
   alert('hi');
  })



})
