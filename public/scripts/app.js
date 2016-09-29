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


function createListElement(list, index) {
  var id = list.id;
  var name = list.name;
  var description = list.description;
  var createdBy = list.user_id;
  var html = `
  <div class="listBox">
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
    <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
  </div>`;

  return $('#lists-container').append(html);
};

function renderLists(lists) {
  $('#lists-container').empty();
  lists.forEach(createListElement);
}

$(document).ready(function() {

  function loadLists() {
    $.ajax({
      'url': '/api/lists',
      'method': 'GET',
      'dataType': 'json',
      'success': function(data) {
        renderLists(data);
      }
    });
  };
  loadLists();

})
