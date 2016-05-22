angular.module('app.routes', [])

.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
        name: 'favorites',
        columns: [
          {name: 'id', type: 'integer primary key'},
          {name: 'location', type: 'text'},
          {name: 'notifications', type: 'integer'}
        ]
      }
    ]
})

.constant(
  'TAP_SERVER', {
    url: 'http://www.taps-aff.co.uk/?api&location='
    // url: '/download.json?'
  }
)

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

  .state('tabsController.weather', {
    url: '/weather',
    params: {
        loc: 'Glasgow'
    },
    views: {
      'tab2': {
        templateUrl: 'templates/weather.html',
        controller: 'weatherCtrl'
      }
    }
  })

  .state('tabsController.weatherLocation', {
    url: '/weather/location/:loc',
    views: {
      'tab2': {
        templateUrl: 'templates/weather.html',
        controller: 'weatherCtrl'
      }
    }
  })

  .state('tabsController.weatherId', {
    url: '/weather/id/:id',
    views: {
      'tab2': {
        templateUrl: 'templates/weather.html',
        controller: 'weatherCtrl'
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

  $urlRouterProvider.otherwise('/page1/weather/location/Glasgow')

});
