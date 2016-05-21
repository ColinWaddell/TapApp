angular.module('app.controllers', [])

.controller('locationsCtrl', function($scope, $state) {
  $scope.searchLocation = function (location) {
    $state.go('tabsController.weather', {'location': location});
  };
})

.controller('weatherCtrl', function($scope, $stateParams, $http) {
  $scope.title = "Loading " + $stateParams.location;
console.log($stateParams.location);
  $http({
    method: 'GET',
    url: 'http://www.taps-aff.co.uk/?api&location='+$stateParams.location
    //url: '/download.json'
  })
  .then(function successCallback(res) {
    $scope.weather = res.data;
    $scope.title = "Weather";
  },
  function errorCallback(res) {
    $scope.error = "Error loading weather data.";
    $scope.title = "Error";
  });

})

.controller('settingsCtrl', function($scope) {

})
