'use strict';

angular.module('lamusiqueApp')
  .controller('NavbarCtrl', function ($scope, $http, $timeout, $rootScope, UserService) {

    $scope.user = UserService;
    var controller = this;
    controller.saveUserDataOnLogin = $scope.user.saveUserDataOnLogin;
   
    //check if user logged in
    $timeout(function() {
      $http.get('/api/user/isLoggedIn')
        .success(function(data, status, headers, config) {
          controller.saveUserDataOnLogin(data);
        });
    });

    $rootScope.$on('update points', function(e, data){
      //console.log('navbar received update points event for ' + data.points);
      $scope.user.setUserPoints(data.points);
    });

    $scope.logout = function() {
      $http.post('/api/user/logout');
      $scope.user.setUserLoggedIn(false);
    }

    $scope.login = function() {
      $scope.inSignup = false;
      $scope.inLogin = true;
    }

    $scope.signup = function() {
      $scope.inLogin = false;
      $scope.inSignup = true;
    }

    $scope.cancel = function() {
      $scope.inLogin = false;
      $scope.inSignup = false;


    }
  });

