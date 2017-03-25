'use strict';

var map;
var markers = [];

initMap();

var defaultIcon = makeMarkerIcon('0091ff');

// Initialize the map, centered in Berkeley
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 37.85074, lng: -122.275276},
		zoom: 13,
		mapTypeControl: false
	});

	// Setup autocomplete places search bar
	var input = document.getElementById('search-bar');
	var searchBox = new google.maps.places.SearchBox(input, map.getBounds());

	var bounds = google.maps.LatLngBounds();
	searchBox.addListener('places_changed', userSearchHandler(searchBox, map));

	map.addListner('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});
}


function clearMarkers() {
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
	markers = [];
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
// Credit to Udacity Maps course
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
		'|40|_|%E2%80%A2',
		new google.maps.Size(21, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 34),
		new google.maps.Size(21,34));
	return markerImage;
}

function userSearchHandler(searchBox,map) {
	// This function should take a search place, geocode it
	// send request to "Nearest Roads" API then query the DB
	// serverside

	var places = searchBox.getPlaces();

	// TODO: Add Handler for this case
	if (places == 0) {
		return;
	}
	
	// Hide old markers
	clearMarkers();
	
	// Only include the first place
	var place = places[0];

	markers.push(new google.maps.Marker({
		map: map,
		icon: defaultIcon,
		title: place.name,
		position: place.geometry.location
	}));

	// Zoom to pin	
	if (place.geometry.viewport) {
		map.fitBounds(place.geometry.viewport);
	} else {
		map.setCenter(place.geometry.location);
		map.setZoom(17);
	}
}
initMap();


