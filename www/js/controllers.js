/*global angular */
angular.module('app.controllers', [])

.controller('locationsCtrl', function($scope, $state, Favorites) {
  $scope.search_loc = "";

  $scope.searchLocation = function (search_loc) {
    $state.go('tabsController.weather', {'loc': search_loc});
  };
  $scope.clearSearch = function () {
    search_loc = "";
  };

  $scope.popluateFavorites = function(favorites){
    console.log(favorites);
  };

  $scope.errorLoadingFavorites = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Error deleting favorite',
      template: 'Sorry - Try restarting the app or clearing the favorites list in Settings.',
      okText: 'Apology Accepted'
    });
  }

  Favorites
    .all()
    .then(
      $scope.popluateFavorites,
      $scope.errorLoadingFavorites
    );
})

.controller('weatherCtrl',
  function($scope, $stateParams, $http, $ionicPopup, Favorites, TAP_SERVER) {

    $scope.grabWeatherData = function(location) {
      $http(
        {
          method: 'GET',
          url: TAP_SERVER.url+location
        })
        .then(
          $scope.weatherLoadSuccess,
          $scope.weatherLoadError);
    }

    $scope.weatherLoadSuccess = function (res) {
      $scope.weather = res.data;
      $scope.title = "Weather";
    };

    $scope.weatherLoadError = function weatherLoadError(res) {
      $scope.error = "Error loading weather data.";
      $scope.title = "Error";
    };

    $scope.favoriteLoadSuccess = function(fav) {
      $scope.id = fav.id;
      $scope.notify = fav.notification;
      $scope.favorite = true;

      $scope.grabWeatherData($scope.location);
    }

    $scope.favoriteLoadFailure = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Error saving favorite',
        template: 'Sorry - Try clearing the favorites list in Settings.',
        okText: 'Apology Accepted'
      });
    }

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
        template: 'Sorry - Try restarting the app or clearing the favorites list in Settings.',
        okText: 'Apology Accepted'
      });
    }

    $scope.toggleFavorite = function(){
      if($scope.favorite)
        Favorites
          .delete($scope.id)
          .then($scope.favoriteDeleteSuccess, $scope.favoriteDeleteFailure);
      else
        Favorites
          .addFavorite($scope.location)
          .then($scope.favoriteAddSuccess, $scope.favoriteAddFailure);
      ;
    }

  /* Attempt to load via a given id parameter */
  if($stateParams.id){
    $scope.id = $stateParams.id;
    Favorites
      .getById($scope.id)
      .then(
        favoriteLoadSuccess,
        favoriteLoadFailure);
  }

  /* THE CODE */
  $scope.title = "Loading " + $scope.location;
  $scope.favorite = false;
  $scope.notify = false

  /* Default to trying to load via a loction parameter */
  $scope.location = $stateParams.loc || 'Glasgow';
  Favorites
    .getByLocation($scope.location)
    .then(
      /* This location is in favorites */
      $scope.favoriteLoadSuccess,
      /* Default load case if not a favorite */
      function(){
        $scope.grabWeatherData($scope.location);
      });
})

.controller('settingsCtrl', function($scope, Favorites) {
  $scope.delete_confim = false;

  $scope.ClearFavorites = function(){
    Favorites.deleteall();
  }

})
