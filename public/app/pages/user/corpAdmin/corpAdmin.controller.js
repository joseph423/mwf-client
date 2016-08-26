angular
  .module('app')
  .service('CorpService', function($http){
    return {
      insertCorp: function(company){
        $http({
          method: 'POST',
          url: 'http://192.168.12.119:3000/api/users/login',
          data: company
        }).then(function successCallback(response) {
            alert(response.data + " (ID : " + user.id + ")");
            $state.go('profile');
          }, function errorCallback(response) {
            alert(response.data);
          });
      }
    }
  })
  .controller('CorpController', function($scope, $http, $state, CorpService) {

    $scope.insertCorp = function() {
      CorpService.insertCrop()
    }
  });
