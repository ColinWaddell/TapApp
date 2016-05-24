/*global angular */
angular.module('app.controllers', [])

.controller('forecastIcon', function($scope, WEATHER_CLOTHING, WEATHER_ICON){

  $scope.forecastToggleIcon = function(status){
    $scope.toggled = !status;
  }

  $scope.weatherToIconSVG = function(code){
    if(WEATHER_ICON.length < code && code > -1){
      return 'img/symbols/weather/' + WEATHER_ICON[code] + ".svg";
    }else{
      return 'img/symbols/weather/cloud.svg';
    }
  }

  $scope.weatherToClothingSVG = function(code){
    if(WEATHER_CLOTHING.length < code && code > -1){
      return 'img/symbols/clothing/' + WEATHER_CLOTHING[code] + ".svg";
    }else{
      return 'img/symbols/clothing/jacket.svg';
    }
  }

  $scope.toggled = false;
})

.controller('locationsCtrl', function($scope, $state, Favorites, Placenames) {
  $scope.search_loc = "";
  $scope.search_suggestions = [];

  $scope.$on("$ionicView.enter", function(event, data){
    Favorites
      .all()
      .then(
        $scope.popluateFavorites,
        $scope.errorLoadingFavorites
      );
  });

  $scope.searchFilter = function(search_loc){
    ss = Placenames.getNames(search_loc);
    $scope.search_suggestions = ss;
  }

  $scope.searchLocation = function (search_loc) {
    $state.go('tabsController.weather', {'location': search_loc});
  };
  $scope.clearSearch = function () {
    search_loc = "";
    $scope.search_suggestions = [];
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
  function($scope, $stateParams, $http, $window, $ionicPopup, ionicToast, Favorites, TAP_SERVER, WEATHER_CLOTHING) {

    $scope.grabWeatherData = function(location) {
      $scope.title = $scope.location + "... Loading";
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

      if(res.data.taps==="error"){
        if(res.data.place_error.length){
          ionicToast.show(
            'Can\'t find ' + res.data.place_error, 'middle', false, 1500
          );
        }
      }

      $scope.weather = res.data;
      $scope.location = $scope.weather.location;
      $scope.title = $scope.location + ", the weather is:";
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
      $scope.grabWeatherData($stateParams.location);
    }

    /* THE CODE */
    $scope.favorite = false;
    $scope.notify = false;
    $scope.forecastWidth =  (4*$window.innerWidth) + 'px';
  })

  .controller('settingsCtrl', function($scope, Favorites) {
    $scope.delete_confim = false;

    $scope.ClearFavorites = function(){
    Favorites.deleteAll();
  }

})
