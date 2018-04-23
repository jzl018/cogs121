const tMethod = $('a.method');

tMethod.click(function() {
  const currentBtn = $(this).attr('id');
  $('#transportStyle').text(currentBtn);
});
