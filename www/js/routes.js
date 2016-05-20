angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.locations', {
    url: '/locations',
    views: {
      'tab1': {
        templateUrl: 'templates/locations.html',
        controller: 'locationsCtrl'
      }
    }
  })

  .state('tabsController.loading', {
    url: '/weather',
    views: {
      'tab2': {
        templateUrl: 'templates/loading.html',
        controller: 'loadingCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/locations')

  

});