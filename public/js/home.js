$(document).ready(() => {
  reloadHome();
});

function reloadHome() {
  $.ajax({
    url: 'users',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      $('#eventTitle').html(data[0]);
      $('#eventTitle').show();
    },
  });
}
