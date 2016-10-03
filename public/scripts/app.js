$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

// used to toggle the menu
$("#hamburger,#hideNav").click(function() {
  $('#mySidenav').toggleClass('side-active');
});



function favouriteCheck() {
  $.ajax({
    url: '/api/getFavourites',
    method: 'GET',
    success: function(data){
      data.forEach(function(item){
        /*console.log(item.list_id);*/
        $(`#heart-${item.list_id}`).addClass('isFavour').css({'color':'red'});
      })
    }
  })
}

function addToFavourites(listid) {
  $.ajax({
    method:"POST",
    url:"/api/postlike",
    data: {list:listid},
    success: function(response){
      console.log(response);
    }
  })
}

function removeFromFavourites(listid){
  $.ajax({
    type: 'DELETE',
    url:"/api/dellike",
    data: {list:listid},
    success: function(response){
      console.log(response);
    }
  })
}


function renderLists(lists) {
  $('#lists-container').empty();
  lists.forEach(createListElement);
  favouriteCheck();

  //ON CLICK CHECKS IF already favourited
  $( ".glyphicon-heart-empty" ).on( "click", function() {
    let selectedList = $(this).data('likeid');
    if($(this).hasClass('isFavour')){
      removeFromFavourites(selectedList);
      $(this).removeClass('isFavour').css({'color':'grey'});
    } else {
      addToFavourites(selectedList);
      $(this).addClass('isFavour').css({'color':'red'});
    }
  });
}

function createListElement(list, index) {
  var id = list.id;
  var name = list.name;
  var description = list.description;
  var createdBy = list.user_id;
  var liked;
  var html = `
  <div class="listBox" id ="${id}">
    <h3>
      id: ${id}
    </h3>
    <h2>
      ${name}
    </h2>
    <p>
      ${description}
    </p>
    <p class="creator">
      By: ${createdBy}
    </p>
    <span id="heart-${id}" data-likeid="${id}" class="glyphicon glyphicon-heart-empty" aria-hidden="true">&nbsp;<p>Like</p></span>
    <span class="glyphicon glyphicon-pencil" aria-hidden="true">&nbsp;<p>Edit</p></span>
  </div>`;

  return $('#lists-container').append(html);
};


$(document).ready(function() {

  function loadLists() {
    $.ajax({
      'url': '/api/getAllLists',
      'method': 'GET',
      'dataType': 'json',
      'success': function(data) {
        renderLists(data);
      }
    });
  };
  loadLists();

 $('#edit-map').on('click', function(){
   $('#edit-map').toggleClass('insert-mode');
   $('#editMode').slideToggle('slow');
 })

})
