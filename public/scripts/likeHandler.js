
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

<<<<<<< HEAD
// changes the color of the heart by adding 'liked' class
    $(".glyphicon-heart-empty").on("click", function(){
        console.log('liked')
        $(".glyphicon-heart-empty").toggleClass("liked");
    });
=======
>>>>>>> 351594c2bdcf13512197fa18b51828c339866901

$(".glyphicon-heart-empty").on("click", function(){
   /* console.log($(this).data('likeid'));*/
   alert('hi');
  })



})
