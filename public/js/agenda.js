$('a.studentBtn').click(function() {
  const requestURL = 'users/' + $(this).attr('id');
  console.log('making ajax request to:', requestURL);

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('You received some data!', data);
      $('#class1').text(data.classes[0].courseName);
      $('#location1').text(data.classes[0].location);
      $('#class2').text(data.classes[1].courseName);
      $('#location2').text(data.classes[1].location);
      $('#class3').text(data.classes[2].courseName);
      $('#location3').text(data.classes[2].location);
    },
  });
});
