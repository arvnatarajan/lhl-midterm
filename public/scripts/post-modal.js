$( document ).ready(()=>{
  $("#modal-submit").on('click', (event)=>{
    let data = {
      'title': $('#point-title').val(),
      'description': $('#point-description').val(),
      'picture': $('#point-picture').val()
    }

    $.ajax({
        url: "/api/createpoints",
        type: "POST",
        data: data,
        success: ()=>{
          console.log(success);
        }})
  })
});
