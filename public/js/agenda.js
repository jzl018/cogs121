let calledFromOther = false;

$('#Events').click(function() {
  const eventsButton = $("#Events");
  let buttonText = eventsButton.text();

  //const title = $('#Events.studentBtn btn btn-dark');
  //console.log(title);
/*  console.log('making ajax request to:', requestURL);

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('You received some data!', data);
      $('#class1').html(data.coursename);
      $('#location1').html(data.location);
      $('#class2').html(data.coursename2);
      $('#location2').html(data.location2);
      $('#class3').html(data.coursename3);
      $('#location3').html(data.location3);
      $('#class4').html(data.testcourse);
      $('#location4').html(data.testlocation);*/


  if (buttonText=="See My Events") {
    eventsButton.html("My Events");
    $.ajax({
      url: 'users',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        $('#agenda').html(data);
        $('#agenda').show();
      },
    });
  } else {
    if (!calledFromOther) {
      eventsButton.html("See My Events");
      $('#agenda').hide();
    }
    else {
      $.ajax({
        url: 'users',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          $('#agenda').html(data);
          $('#agenda').show();
        },
      });
      calledFromOther = false;
    }
  }
});



  $('#insertButton').click(() => {
    console.log($('#autocomplete').text());


    const eventsButton = $("#Events");
    let buttonText = eventsButton.text();

    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: 'users',
      type: 'POST', // <-- this is POST, not GET
      data: {
              name: $('#insertNameBox').val(),
              location: autocomplete.getPlace().name
            },
      success: (data) => {
        calledFromOther = true;
        $('#Events').trigger('click');
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
        calledFromOther = true;
        $('#Events').trigger('click');
        $('#insertNameBox').val('');
        $('#autocomplete').val('');
      }
    });
  });

  var placeSearch, autocomplete, geocoder;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();

  // let input = document.getElementById('autocomplete');
  // let autocomplete = new google.maps.places.Autocomplete(input, {placeIdOnly: true});


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

  //codeAddress(document.getElementById('autocomplete').value);
}
