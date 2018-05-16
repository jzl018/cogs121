let ucsd_ltlng = {lat:32.88317815150233, lng:-117.24126615311246};
let addMarker = 0;
let currentPos = {};
let origin = {};

function initMap() {

    //Create a map object and specify the DOM element for display.
    let map = new google.maps.Map(document.getElementById('map'), {
        center: ucsd_ltlng,
        zoom: 14
    });

    infoWindow = new google.maps.InfoWindow;
    infoWindow.setOptions({maxWidth:100});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        origin = currentPos;

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

    let input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    let autocomplete = new google.maps.places.Autocomplete(input, {placeIdOnly: true});
    autocomplete.bindTo('bounds', map);

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
        }
        
        destination = place.place_id;
        
        directionsService.route({
            origin: origin,
            destination: {'placeId': destination},
            travelMode: 'WALKING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
