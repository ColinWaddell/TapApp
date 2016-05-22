/*global angular */
angular.module('app.controllers', [])

.controller('locationsCtrl', function($scope, $state, Favorites) {
  $scope.search_loc = "";

  $scope.$on("$ionicView.enter", function(event, data){
    Favorites
      .all()
      .then(
        $scope.popluateFavorites,
        $scope.errorLoadingFavorites
      );
  });

  $scope.searchLocation = function (search_loc) {
    $state.go('tabsController.weather', {'location': search_loc});
  };
  $scope.clearSearch = function () {
    search_loc = "";
  };

  $scope.loadFavoriteById = function(id){
    $state.go('tabsController.weather', {'location': id});
  }

  $scope.popluateFavorites = function(favorites){
    $scope.favorites = favorites;
  };

  $scope.errorLoadingFavorites = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Error deleting favorite',
      template: 'Sorry - Try restarting the app or clearing the favorites list in Settings.',
      okText: 'Apology Accepted'
    });
  }
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
      $scope.location = $scope.weather.location;
      $scope.title = "Weather";
    };

    $scope.weatherLoadError = function weatherLoadError(res) {
      $scope.error = "Error loading weather data.";
      $scope.title = "Error";
    };

    $scope.favoriteLoadSuccess = function(fav) {
      angular.extend($scope, fav)
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
          .add($scope.location)
          .then($scope.favoriteAddSuccess, $scope.favoriteAddFailure);
      ;
    }

  /* Attempt to load via a given id parameter */
  $stateParams.id =
    !isNaN($stateParams.location) ?
      $stateParams.location : null;

  if($stateParams.id){
    $scope.id = $stateParams.id;
    Favorites
      .getById($scope.id)
      .then(
        $scope.favoriteLoadSuccess,
        $scope.favoriteLoadFailure);
  }
  else if ($stateParams.location){
    Favorites
      .getByLocation($stateParams.location)
      .then(
        /* This location is in favorites */
        $scope.favoriteLoadSuccess,
        /* Default load case if not a favorite */
        function(){
          $scope.grabWeatherData($stateParams.location);
        });
  }
  else{
    $scope.location = 'Glasgow';
    $scope.grabWeatherData($stateParams.location);
  }

  /* THE CODE */
  $scope.title = "Loading " + $scope.location;
  $scope.favorite = false;
  $scope.notify = false
})

.controller('settingsCtrl', function($scope, Favorites) {
  $scope.delete_confim = false;

  $scope.ClearFavorites = function(){
    Favorites.deleteAll();
  }

})
