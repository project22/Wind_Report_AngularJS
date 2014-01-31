$(function() {
  initialize();
});

$(document).foundation();

var city;
var cityName;

var App = angular.module('App', []);

App.controller('WindReportCtrl', function($scope, $http) {

	$scope.getWindData = function() {
		// alert("fired");
		url = "http://api.wunderground.com/api/3edda987ad0a169a/hourly10day/q/"+ city + ".json?callback=JSON_CALLBACK";
	  $http.jsonp(url)
	    .success(function(data){
	      $scope.weather = data.hourly_forecast;  
	      console.log(data.hourly_forecast);
	      $scope.data = { cityName: cityName };                   
	  })
	}

});


// function FirstCtrl($scope){
//   $scope.data = {message: "Hello"};
// }




// Google Autocomplete

var autocomplete;

function initialize() {
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('city')),
      { types: ['geocode'] });
  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    
    var place = autocomplete.getPlace();
	  console.log(place);
	  // 37.8,-122.4
	  city = place.geometry.location.d + "," + place.geometry.location.e;
	  cityName = place.address_components[0].long_name;
	  // city = place.address_components[0].long_name + ", " + place.address_components[2].long_name + ", " + place.address_components[3].long_name;
	  console.log(city);
    
  });
}

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
          geolocation));
    });
  }
}
// [END region_geolocation]

