$(document).ready(function() {
  const loadListsToProfile = () => {
    $.ajax({
      method: "GET",
      url: "/api/lists"
    }).done((lists) => {
      lists.forEach((list) => {
        $('#your-lists').append(`
            <tr>
              <td>${list.name}</td>
            </tr>
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
            <tr>
              <td>${list.name}</td>
            </tr>
          `)
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }

    loadListsToLists();

    const loadFavouritesToLists = () => {
      $.ajax({
        method: "GET",
        url: "/api/getFavourites"
      }).done((lists) => {
        lists.forEach((list) => {
          $('#fav-lists').append(`
              <tr>
                <td>${list.name}</td>
              </tr>
            `)
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }

      loadFavouritesToLists();

});
