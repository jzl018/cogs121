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
    eventsButton.html("See My Events");
    $('#agenda').hide();
  }
});

  

  $('#insertButton').click(() => {

    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: 'users',
      type: 'POST', // <-- this is POST, not GET
      data: {
              name: $('#insertNameBox').val(),
              location: $('#insertLocationBox').val()
            },
      success: (data) => {
        $('#Events').trigger('click');
        $('#insertNameBox').val('');
        $('#insertLocationBox').val('');
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
        $('#Events').trigger('click');
        $('#insertNameBox').val('');
        $('#insertLocationBox').val('');
      }
    });
  });
