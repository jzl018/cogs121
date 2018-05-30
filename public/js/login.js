$('#signupButton').click(() => {

    const title = $('#title');

    console.log(title);

    const img = $('img');
    const imgURL = img.attr('src');

    if (imgURL === "images/sean.jpg") {
        img.attr('src', "images/guo.jpg");
        title.html("Ready, Set, Guo!");
    } else {
        img.attr('src', "images/sean.jpg");
        title.html("Ready, Set, Kross!");
    }

    $('#easteregg').html('you found an easteregg!! - michelle');

});