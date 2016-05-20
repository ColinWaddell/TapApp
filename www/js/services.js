angular.module('app.services', [])
angular.module('starter.services', ['ngResource'])

.factory('Session', ['$resource', function($resource) {
  $resource(
    'http://localhost/tapsaff/?api&location=:location',
    {location: "Glasgow"}
  );
}])


.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);
