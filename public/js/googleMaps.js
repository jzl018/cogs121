function initMap() {
	// add your code here
	var ucsd_ltlng = {lat:32.878733, lng:-117.241694};

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: ucsd_ltlng,
		zoom: 15
	});

	var marker = new google.maps.Marker({
		position: ucsd_ltlng,
		map:map,
		title: "HSS"
	});
}
