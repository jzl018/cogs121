/* Has function that will automatically load upon entering page. The function
will get the first event (name and location) from the database in user's agenda
and will display send it for displaying.
*/

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
