angular.module('app.controllers', [])
angular.module('starter.controllers', ['starter.services'])

.controller('locationsCtrl', function($scope) {

})

.controller('weatherCtrl', function($scope, Session) {
  $scope.session = Session.query({location: 'Edinburgh'});
})

.controller('settingsCtrl', function($scope) {

})
