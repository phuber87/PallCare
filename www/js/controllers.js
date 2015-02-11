angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $state, $rootScope, $ionicLoading, $cordovaDialogs) {
  $scope.user = {
    username: null,
    password: null
  };

  $scope.error = {};

  /*$scope.clearInput = function () {
    // to clear the whole input of an input field
  };*/

  $scope.login = function () {
    if (window.cordova && window.cordova.plugins.Keyboard && cordova.plugins.Keyboard.isVisible) {
      cordova.plugins.Keyboard.close();
    }

    $scope.loading = $ionicLoading.show({
      template: 'Anmelden...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    var user = $scope.user;
    Parse.User.logIn(user.username.toLowerCase(), user.password, {
      success: function(user) {
        $scope.loading = $ionicLoading.hide();
        $rootScope.user = user;
        $state.go('tab.dash', {clear: true});
      },
      error: function(user, err) {
        $scope.loading = $ionicLoading.hide();
        // The login failed. Check error to see why.
        /*if (err.code === 101) {
          $scope.error.message = 'Invalid login credentials';
        } else {
          $scope.error.message = 'An unexpected error has ' +
          'occurred, please try again.';
        }*/
        $cordovaDialogs.alert('Benutzername und/oder Passwort falsch', 'Anmeldung fehlgeschlagen', 'OK')
          .then(function() {
            // callback success
            $scope.$apply();
          });

      }
    });
  };
})

.controller('DashCtrl', function($scope) {})

.controller('TemperatureCtrl', ['$scope','TemperatureService', '$state', function($scope, TemperatureService, $state) {

    var currentUserId = Parse.User.current().id;

    TemperatureService.getAllByUser({createdBy: {__type: 'Pointer', className: '_User', objectId: currentUserId}}).success(function(data){
      $scope.temperatures = data.results;
      console.log(JSON.stringify($scope.temperatures));
    }).error(function(data) {
      console.log(data);
    });

    /*
    TemperatureService.getAll().success(function(data){
      $scope.temperatures = data.results;
      //console.log(JSON.stringify($scope.temperatures));
    });
    */

    $scope.delete = function(temperature){
      TemperatureService.delete(temperature.objectId);
      $scope.temperatures.splice($scope.temperatures.indexOf(temperature),1);
    }

    $scope.newTemperature = {};
    $scope.create = function(){
      TemperatureService.create({DegreeCelsius:$scope.newTemperature.degreeCelsius, createdBy: {__type: 'Pointer', className: '_User', objectId: currentUserId}}).success(function(data){
        $state.go('tab.dash');
      }).error(function(data) {
        console.log(data);
        $state.go('tab.dash');
      });
    }

    $(function () {
      $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('#chart').highcharts('StockChart', {

          credits: {
            enabled: false
          },

          rangeSelector : {
            selected : 1,
            inputEnabled: false
          },

          title : {
            text : 'AAPL Stock Price'
          },

          series : [{
            name : 'AAPL',
            data : data,
            tooltip: {
              valueDecimals: 2
            }
          }]
        });
      });
    });

}])

.controller('TemperatureEditCtrl',['$scope','TemperatureService','$state','$stateParams', function($scope, TemperatureService, $state, $stateParams){

    //console.log($stateParams.id + ' - ' + $stateParams.degreeCelsius);

    $scope.editTemperature = {id:$stateParams.id, degreeCelsius:parseFloat($stateParams.degreeCelsius)};
    $scope.edit = function(){
      TemperatureService.edit($scope.editTemperature.id, {DegreeCelsius:$scope.editTemperature.degreeCelsius}).success(function(data){
        $state.go('tab.temperature');
      }).error(function(data) {
        console.log(data);
        $state.go('tab.temperature');
      });
    }

}])

.controller('PropertiesCtrl', function($scope, $state, $rootScope, $ionicLoading) {

    $scope.username = Parse.User.current().getUsername();

    $scope.logout = function () {

      $scope.loading = $ionicLoading.show({
        template: 'Abmelden...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 1000
      });

      Parse.User.logOut();
      $rootScope.user = null;
      $state.go('login', {clear: true});
    };

});

/*
.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/