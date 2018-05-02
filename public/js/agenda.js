$('a.studentBtn').click(function() {
  const requestURL = 'users/' + $(this).attr('id');
  console.log('making ajax request to:', requestURL);

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
      //$('#class4').html(data.testcourse);
    },
  });
});

  $('#insertButton').click(() => {
    const requestURL = 'users/michelle';
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'POST', // <-- this is POST, not GET
      data: {
              testcourse: $('#insertNameBox').val(),
              testlocation: $('#insertLocationBox').val(),
            },
      success: (data) => {
        $('#status').html(data.message);
      }
    });
  });