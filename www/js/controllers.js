angular.module('app.controllers', [])

.controller('locationsCtrl', function($scope, $state) {
  $scope.search_loc = "";

  $scope.searchLocation = function (search_loc) {
    $state.go('tabsController.weather', {'search_loc': search_loc});
  };
  $scope.clearSearch = function () {
    search_loc = "";
  };
})

.controller('weatherCtrl', function($scope, $stateParams, $http, Favorites) {
  $scope.title = "Loading " + $stateParams.location;

  $scope.weatherLoadSuccess = function (res) {
    $scope.weather = res.data;
    $scope.title = "Weather";
  };

  $scope.weatherLoadError = function weatherLoadError(res) {
    $scope.error = "Error loading weather data.";
    $scope.title = "Error";
  };

  $http(TAP_GET)
  .then($scope.weatherLoadSuccess, $scope.weatherLoadError);

  $scope.documents = [];
  $scope.document = null;
  // Document.addProject('nnnname', 'ccccompany', 'dddddescription', 0.0, 1.1);
  // // Get all the documents
  // Document.all().then(function(documents){
  //     $scope.documents = documents;
  // });

})

.controller('settingsCtrl', function($scope, Favorites) {
  $scope.delete_confim = false;
  $scope.ClearFavorites = function(){
    if (!$scope.delete_confim) return;
    $scope.delete_confim = false;



  }
})
