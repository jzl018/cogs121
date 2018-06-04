/* Defines the functions needed for our agenda page such as displaying the data,
inserting new data, and deleting data. Also has the function that autocompletes
in location for the location input for an event.
*/

$(document).ready(() => {
  reloadAgenda();
});

function reloadAgenda() {
  $.ajax({
    url: 'users',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      $('#agenda').html(data);
      $('#agenda').show();
    },
  });
}

$('#insertButton').click(() => {
  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: 'users',
    type: 'POST', // <-- this is POST, not GET
    data: {
            name: $('#insertNameBox').val(),
            location: autocomplete.getPlace().name
          },
    success: (data) => {

      reloadAgenda();

      $('#insertNameBox').val('');
      $('#autocomplete').val('');
    }
  });
});

$('#deleteButton').click(() => {

  $.ajax({
    url: 'users/Delete',
    type: 'POST',
    data: {
      name: $('#insertNameBox').val(),
    },
    success: (data) => {

      reloadAgenda();

      $('#insertNameBox').val('');
      $('#autocomplete').val('');
    }
  });
});

var placeSearch, autocomplete, geocoder;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();

  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
       types: ['geocode']
     });

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      // This is the lat and lng results[0].geometry.location
      alert(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function fillInAddress() {
  var place = autocomplete.getPlace();

}
