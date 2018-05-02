function initMap() {
	//Added this
	var markers = [];

	var ucsd_ltlng = {lat:32.878733, lng:-117.241694};

	//Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: ucsd_ltlng,
		zoom: 14
	});

	// Default marker at HSS
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

  	// Listen for the event fired when the user selects an item from the
  	// pick list. Retrieve the matching places for that item.
  	google.maps.event.addListener(searchBox, 'places_changed', () => {
    	var places = searchBox.getPlaces();

    	if (places.length == 0) {
      		return;
    	}
    	for (var i = 0, newMarker; newMarker = markers[i]; i++) {
      		newMarker.setMap(null);
    	}

    	// For each place, get the icon, place name, and location.
    	//markers = [];
    	var bounds = new google.maps.LatLngBounds();
    	for (var i = 0, place; place = places[i]; i++) {
      		var image = {
	        	//url: place.icon,
	       		size: new google.maps.Size(500, 500),
	       		origin: new google.maps.Point(0, 0),
	        	anchor: new google.maps.Point(17, 34),
	        	scaledSize: new google.maps.Size(35, 35)
      		};

		    // Create a marker for each place.
		    var addMarker = new google.maps.Marker({
		      map: map,
		      icon: image,
		      title: place.name,
		      position: place.geometry.location
		    });

	      	markers.push(addMarker);

	      	bounds.extend(place.geometry.location);
	      	bounds.extend(ucsd_ltlng);
	    };
    	map.fitBounds(bounds);
 	 });
  	//[END region_getplaces]
};

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
