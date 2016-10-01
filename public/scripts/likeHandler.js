
$( document ).ready(() => {



$.ajax({
  url: '/api/postlike',
  type: 'POST',
  data: data,
  success: () => {
    console.log('Point added to database');
  }
})

};
