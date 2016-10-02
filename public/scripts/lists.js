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

    const loadFavouritesToLists = () => {
      $.ajax({
        method: "GET",
        url: "/api/getFavourites"
      }).done((lists) => {
        lists.forEach((list) => {
          console.log(list);
          $('#fav-lists').append(`
              <tr>
                <td>${list.name}</td>
                <td>${list.first_name} ${list.last_name}</td>
                <td>Edit</td>
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
