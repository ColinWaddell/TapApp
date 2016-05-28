angular.module('app.routes', [])

.constant('DB_CONFIG',
  {
    name: 'DB',
    tables: [
      {
        name: 'favorites',
        columns: [
          {name: 'id', type: 'integer primary key'},
          {name: 'location', type: 'text'},
          {name: 'notify', type: 'integer'}
        ]
      },
      {
        name: 'settings',
        columns: [
          {name: 'id', type: 'integer primary key'},
          {name: 'tempScale', type: 'text'},
          {name: 'iconDefault', type: 'text'}
        ]
      }
    ]
  }
)

.constant(
  'T_SCALES', [
      {id: 'F', title:'Fahrenheit'},
      {id: 'C', title:'Celsius'}
])

.constant(
  'W_ICONS', [
      {id: 'weather',  title:'Weather'},
      {id: 'clothing', title:'Clothing'}
])

.constant(
  'SETTINGSDFTL',{
    tempScale: 'C',
    iconDefault: 'clothing'
  }
)

.constant(
  'TAP_SERVER', {
    url: 'http://www.taps-aff.co.uk/?api&location='
    // url: '/download.json?'
    // url: '/place_error.json?'
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
    url: '/weather/location/:location',
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
