function initMap() {
	// add your code here
	var ucsd_ltlng = {lat:32.878733, lng:-117.241694};

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: ucsd_ltlng,
		zoom: 18
	});

	var marker = new google.maps.Marker({
		position: ucsd_ltlng,
		map:map,
		title: "HSS"
	});

	// Added this 
	// Create the search box and link it to the UI element.
  	var input = /** @type {HTMLInputElement} */ (
    	document.getElementById('pac-input'));
  	map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  	var searchBox = new google.maps.places.SearchBox(
    	/** @type {HTMLInputElement} */
    	(input));
}

// 	infoWindow = new google.maps.InfoWindow;
// 	if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//
//         infoWindow.setPosition(pos);
//         infoWindow.setContent('Location found.');
//         infoWindow.open(map);
//         map.setCenter(pos);
//       }, function() {
//         handleLocationError(true, infoWindow, map.getCenter());
//       });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }
//
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// 	infoWindow.setPosition(pos);
// 	infoWindow.setContent(browserHasGeolocation ?
// 												'Error: The Geolocation service failed.' :
// 												'Error: Your browser doesn\'t support geolocation.');
// 	infoWindow.open(map);
// }
