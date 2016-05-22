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

.controller('weatherCtrl',
  function($scope, $stateParams, $http, $ionicPopup, Favorites, TAP_GET) {

  $scope.location = $stateParams.location || 'Glasgow';

  $scope.title = "Loading " + $scope.location;

  $scope.favorite = false;
  $scope.notify = false

  $scope.weatherLoadSuccess = function (res) {
    $scope.weather = res.data;
    $scope.title = "Weather";
  };

  $scope.weatherLoadError = function weatherLoadError(res) {
    $scope.error = "Error loading weather data.";
    $scope.title = "Error";
  };

  $scope.favoriteAddSuccess = function(id) {
    $scope.id = id;
    $scope.favorite = true;
  }

  $scope.favoriteAddFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error saving favorite',
      template: 'Sorry - Try clearing the favorites list in Settings.',
      okText: 'Apology Accepted'
    });
  }

  $scope.favoriteDeleteSuccess = function(id) {
    $scope.id = null;
    $scope.favorite = false;
  }

  $scope.favoriteDeleteFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error deleting favorite',
      template: 'Sorry - Try restarting the app',
      okText: 'Apology Accepted'
    });
  }

  $scope.toggleFavorite = function(){
    if($scope.favorite)
      Favorites
        .deleteFavorite($scope.id)
        .then(favoriteDeleteSuccess, favoriteDeleteFailure);
    else
      Favorites
        .addFavorite($scope.location)
        .then(favoriteAddSuccess, favoriteAddFailure);
    ;
  }

  $http(TAP_GET).then($scope.weatherLoadSuccess, $scope.weatherLoadError);

  // $scope.documents = [];
  // $scope.document = null;
  // Document.addProject('nnnname', 'ccccompany', 'dddddescription', 0.0, 1.1);
  // // Get all the documents
  // Document.all().then(function(documents){
  //     $scope.documents = documents;
  // });

})

.controller('settingsCtrl', function($scope, Favorites) {
  $scope.delete_confim = false;

  $scope.ClearFavorites = function(){
    Favorites.deleteAllFavorites();
  }

})
