// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaDialogs, $rootScope, $state, $cordovaNetwork) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // unecessary: alert fires two times, if no connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $cordovaDialogs.alert('Das Gerät hat keine Verbindung zum Internet', 'Keine Internetverbindung', 'OK')
        .then(function() {
        });
      }
    }

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(){
      $cordovaDialogs.alert('Das Gerät hat wieder eine Verbindung zum Internet', 'Internetverbindung vorhanden', 'OK')
        .then(function() {
        });
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(){
      $cordovaDialogs.alert('Das Gerät hat keine Verbindung zum Internet', 'Keine Internetverbindung', 'OK')
        .then(function() {
        });
    })

    Parse.initialize('AVK6janhsjZihCK9sXfVEizaFb0rp6VSPnVmE1HM', 'bN7mdLEBI01jaYdvNk72zoMcM6zQNDTiTO5lCJar');
    var currentUser = Parse.User.current();
    if (currentUser) {
      $rootScope.user = currentUser;
      $state.go('tab.dash');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.temperature', {
    url: '/temperature',
    cache: false,
    views: {
      'tab-dash': {
        templateUrl: 'templates/temperature.html',
        controller: 'TemperatureCtrl'
      }
    }
  })
  .state('tab.temperatureEdit', {
    url: '/temperature/edit/:id/:degreeCelsius',
    views: {
      'tab-dash': {
        templateUrl: 'templates/temperatureEdit.html',
        controller: 'TemperatureEditCtrl'
      }
    }
  })

  .state('tab.properties', {
    url: '/properties',
    views: {
      'tab-properties': {
        templateUrl: 'templates/tab-properties.html',
        controller: 'PropertiesCtrl'
      }
    }
  })

  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // for any unmatched URL, redirect to /tab/dash
  $urlRouterProvider.otherwise('/login');

});
