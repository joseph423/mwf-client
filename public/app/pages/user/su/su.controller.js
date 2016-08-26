angular
  .module('app')
  .service('SUService', function($http){
    return {
      insertCorpAcc: function(companyAcc){
        console.log('Creating company account');
        $http({
          method: 'POST',
          url: 'http://192.168.12.119:3000/api/users/login',
          data: companyAcc
        }).then(function successCallback(response) {
            //code
          }, function errorCallback(response) {
            //code
          });
      },
      removeCorpAcc: function(companyAcc){
        console.log('Deleting company account');
        $http({
          method: 'POST',
          url: 'http://192.168.12.119:3000/api/users/login',
          data: companyAcc
        }).then(function successCallback(response) {
          //code
          }, function errorCallback(response) {
            //code
          });
      },
      updateCorpAcc: function(companyAcc){
        console.log('Updating company account');
        $http({
          method: 'POST',
          url: 'http://192.168.12.119:3000/api/users/login',
          data: companyAcc
        }).then(function successCallback(response) {
          //code
          }, function errorCallback(response) {
            //code
          });
      }
    }
  })
  .controller('SUController', function($scope, $rootScope, $http, $state, SUService) {
    $scope.companyAcc = {
      email: '',
      password: ''
    }

    $scope.link = 'app/pages/user/su/su.html';

    $rootScope.profile = {
      role: "su"
    }

    $scope.insertCorpAcc = function() {
      SUService.insertCorpAcc();
    }

    $scope.signout = function(){
      $state.go('login');
    }

    /*$scope.genForm = function(){
      $http({
        method: 'POST',
        url: 'http://192.168.12.159:3000/api/users/genForm',
      }).then(function successCallback(response){
        alert("successfully connect to server");
      }, function errorCallback(response){
        alert("unable to connect server");
      });
    }*/
  });
