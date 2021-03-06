angular
  .module('app')
  .controller('LoginController', function($rootScope, $scope, $http, $state) {
    $scope.user = {
      email: 'su01@gmail.com',
      password: '123456'
    }

    $scope.message = '';

    //$scope.address = 'http://' + $rootScope.serverIp + '/api/users/login';

    $scope.login = function(user){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/users/login',
        data: user
      }).then(function successCallback(response) {
          console.log(response.data);
          $rootScope.permission = response.data;
          $state.go('insertCorpA');
      }, function errorCallback(response) {
          $scope.message = 'Invalid email and password!';
      });
    }
  })
