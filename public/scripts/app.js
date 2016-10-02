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
  $("#mySidenav").animate({
    width: 'toggle'
  }, 1000);
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


function renderLists(lists) {
  $('#lists-container').empty();
  lists.forEach(createListElement);
  favouriteCheck();
}

function createListElement(list, index) {
  var id = list.id;
  var name = list.name;
  var description = list.description;
  var createdBy = list.user_id;
  var html = `
  <div class="listBox" id ="${id}">
    <h3>
      ${id}
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
    <span class="glyphicon glyphicon-share-alt" aria-hidden="true">&nbsp;<p>Share</p></span>
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


})
