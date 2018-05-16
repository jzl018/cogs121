let ucsd_ltlng = {lat:32.88317815150233, lng:-117.24126615311246};
let addMarker = 0;
let currentPos = {};

function initMap() {
	//Added this
	let markers = [];

//	let ucsd_ltlng = {lat:32.88317815150233, lng:-117.24126615311246};
	let directionsService = new google.maps.DirectionsService;
	let directionsDisplay = new google.maps.DirectionsRenderer;
	//Create a map object and specify the DOM element for display.
	let map = new google.maps.Map(document.getElementById('map'), {
		center: ucsd_ltlng,
		zoom: 14
	});
	directionsDisplay.setMap(map);


	// Default marker at HSS
	// var marker = new google.maps.Marker({
	// 	position: ucsd_ltlng,
	// 	map:map,
	// 	title: "HSS"
	// });

	// Create the search box and link it to the UI element.
  	let input =	document.getElementById('pac-input');
  	map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  	let searchBox = new google.maps.places.SearchBox(
     	/** @type {HTMLInputElement} */
     	(input));

    // let autocomplete = new google.maps.places.Autocomplete(input);
    // autocomplete.bindTo('bounds', map);

    infoWindow = new google.maps.InfoWindow;
    infoWindow.setOptions({maxWidth:100});

//    let currentPos = {};

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        let currentLoc = new google.maps.Marker({
            position: currentPos,
            map: map,
            title: "Current Location"
        });

        infoWindow.setPosition(currentPos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(currentPos);
        map.setZoom(18);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  	// Listen for the event fired when the user selects an item from the
  	// pick list. Retrieve the matching places for that item.
  	searchBox.addListener('places_changed', () => {
    	let places = searchBox.getPlaces();

    	if (places.length == 0) {
      		return;
    	}
    	for (let i = 0, newMarker; newMarker = markers[i]; i++) {
      		newMarker.setMap(null);
    	}

    	// For each place, get the icon, place name, and location.
    	//markers = [];
    	let bounds = new google.maps.LatLngBounds();
    	for (let i = 0, place; place = places[i]; i++) {
		    // Create a marker for each place.
//		    let addMarker = new google.maps.Marker({
				addMarker = new google.maps.Marker({
		      map: map,
		      title: place.name,
		      position: place.geometry.location
		    });

	      	markers.push(addMarker);

	      	bounds.extend(place.geometry.location);
	      	bounds.extend(currentPos);
	    };
    	map.fitBounds(bounds);

			calculateAndDisplayRoute(directionsService, directionsDisplay);
 	 });
  	//[END region_getplaces]
};

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	console.log("Hello world")
	directionsService.route({
		origin: currentPos,
		destination: addMarker.position,
		travelMode: 'WALKING'
	},
	function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
			}
			else {
				window.alert('Directions request failed due to ' + status);
			}
	});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
