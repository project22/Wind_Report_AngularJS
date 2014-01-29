var App = angular.module('App', []);

App.controller('WindReportCtrl', function($scope, $http) {

	// url = "/mock_api/San_Francisco.json"
	url = "http://api.wunderground.com/api/3edda987ad0a169a/hourly10day/q/CA/Santa_Monica.json?callback=JSON_CALLBACK";

  $http.jsonp(url)
    .success(function(data){
      $scope.weather = data.hourly_forecast;    
      console.log(data.hourly_forecast);   
                    
  })
});


function FirstCtrl($scope){
  $scope.data = {message: "Hello"};
}

// 3edda987ad0a169a