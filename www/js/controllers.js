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

.controller('weatherCtrl', function($scope, $stateParams, $http, Document) {
  $scope.title = "Loading " + $stateParams.location;

  $http({
    method: 'GET',
    //url: 'http://www.taps-aff.co.uk/?api&location='+$stateParams.location
    url: '/download.json'
  })
  .then(function successCallback(res) {
    $scope.weather = res.data;
    $scope.title = "Weather";
  },
  function errorCallback(res) {
    $scope.error = "Error loading weather data.";
    $scope.title = "Error";
  });

  $scope.documents = [];
  $scope.document = null;
  Document.addProject('nnnname', 'ccccompany', 'dddddescription', 0.0, 1.1);
  // Get all the documents
  Document.all().then(function(documents){
      $scope.documents = documents;
  });

})

.controller('settingsCtrl', function($scope) {

})

.controller('DocumentCtrl', function($scope, Document) {
    $scope.documents = [];
    $scope.document = null;
    // Get all the documents
    Document.all().then(function(documents){
        $scope.documents = documents;
    });
    // Get one document, example with id = 2
    Document.getById(2).then(function(document) {
        $scope.document = document;
    });
})
