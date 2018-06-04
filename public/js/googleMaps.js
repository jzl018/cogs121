/* Creates the map displayed in our home, where the center is at user's current
location. Constructs the path between current location and the inputted
destination. This path is automatically set to walking directions. Location
will be tracked every 5 seconds after triggering the function.
*/
let map = null;
let currentPos = null;
let currentLoc = null;
let myLocCircle = null;
let infoWindow = null;
let trackInterval = null;

let tracking = false;

let directionsDiv = document.getElementById('directions');
directionsDiv.style.maxHeight = "500px";
directionsDiv.style.overflow = "scroll";
let actionImg = document.getElementById('actionImg');
let actionBtn = document.getElementById('agenda');

function initMap() {

    getLocation();

    //Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: currentPos,
        zoom: 14
    });

    infoWindow = new google.maps.InfoWindow;
    infoWindow.setOptions({maxWidth:100});

    let input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    let autocomplete = new google.maps.places.Autocomplete(input, {placeIdOnly: true});
    autocomplete.bindTo('bounds', map);

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(directionsDiv);

    autocomplete.addListener('place_changed', function() {
        let place = autocomplete.getPlace();

        if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
        }

        destination = place.place_id;

        directionsService.route({
            origin: currentPos,
            destination: {'placeId': destination},
            travelMode: 'WALKING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                changeAction();
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


function showDirections() {
    if (directionsDiv.style.zIndex == 49)
        directionsDiv.style.zIndex = -1;
    else
        directionsDiv.style.zIndex = 49;
}

function changeAction() {
    actionImg.src = "images/play-button.png";
    actionImg.style.right = "-1px";
}

function startStopTrack() {
    if (tracking){
        tracking = false;
        clearInterval(trackInterval);
        actionImg.src = "images/play-button.png";
    } else {

        map.setCenter(currentPos);
        map.setZoom(18);

        tracking = true;
        trackInterval = setInterval(() => { getLocation(); }, 3000);
        actionImg.src = "images/pause-button.png";
    }
}

function getLocation() {
    console.log("updating location!!");

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            currentPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            if (currentLoc == null) {
                currentLoc = new google.maps.Marker({
                    position: currentPos,
                    map: map,
                    title: "Current Location",
                    icon: "http://www.robotwoods.com/dev/misc/bluecircle.png"
                });

                myLocCircle = new google.maps.Circle({
                    strokeColor: '#009FFF',
                    strokeOpacity: 0.6,
                    strokeWeight: 1.5,
                    fillColor: '#009FFF',
                    fillOpacity: 0.25,
                    map: map,
                    center: currentPos,
                    radius: 20
                });
            } else {
                currentLoc.setPosition(currentPos);
                myLocCircle.setCenter(currentPos);
            }

            map.setCenter(currentPos);
            map.setZoom(18);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
