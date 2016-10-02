$(document).ready(function() {
  const loadListsToProfile = () => {
    $.ajax({
      method: "GET",
      url: "/api/lists"
    }).done((lists) => {
      lists.forEach((list) => {
        $('#your-lists').append(`
            <p>${list.name}</p>
          `)
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
    loadListsToProfile();

  const loadListsToLists = () => {
    $.ajax({
      method: "GET",
      url: "/api/getAllLists"
    }).done((lists) => {
      lists.forEach((list) => {
        $('#all-lists').append(`
            <p>${list.name}</p>
          `)
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }

    loadListsToLists();

});
