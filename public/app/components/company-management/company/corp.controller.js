angular
  .module('app')
  .directive('search', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/company-management/company/search.html',
      link: function() {
          $(document).ready(function() {
            var handleDataTableButtons = function() {
              if ($("#datatable-buttons").length) {
                $("#datatable-buttons").DataTable({
                  dom: "Bfrtip",
                  buttons: [
                    {
                      extend: "copy",
                      className: "btn-sm"
                    },
                    {
                      extend: "csv",
                      className: "btn-sm"
                    },
                    {
                      extend: "excel",
                      className: "btn-sm"
                    },
                    {
                      extend: "pdfHtml5",
                      className: "btn-sm"
                    },
                    {
                      extend: "print",
                      className: "btn-sm"
                    },
                  ],
                  responsive: true
                });
              }
            };

            TableManageButtons = function() {
              "use strict";
              return {
                init: function() {
                  handleDataTableButtons();
                }
              };
            }();

            $('#datatable').dataTable();

            $('#datatable-keytable').DataTable({
              keys: true
            });

            $('#datatable-responsive').DataTable();

            $('#datatable-scroller').DataTable({
              ajax: "js/datatables/json/scroller-demo.json",
              deferRender: true,
              scrollY: 380,
              scrollCollapse: true,
              scroller: true
            });

            $('#datatable-fixed-header').DataTable({
              fixedHeader: true
            });

            var $datatable = $('#datatable-checkbox');

            $datatable.dataTable({
              'order': [[ 1, 'asc' ]],
              'columnDefs': [
                { orderable: false, targets: [0] }
              ]
            });
            $datatable.on('draw.dt', function() {
              $('input').iCheck({
                checkboxClass: 'icheckbox_flat-green'
              });
            });

            TableManageButtons.init();
          });
      }
    }
  })
  .service('CMService', function($http, $q){
    return {
      insertCorp: function(companyInsert){  //insert
        console.log('Creating company info');
        $http({
          method: 'POST',
          url: 'http://192.168.12.159:3000/api/company/insert',
          data: companyInsert
        }).then(function successCallback(response) {
            console.log('done - insert');
          }, function errorCallback(response) {
            console.log(response);
          });
      },
      removeCorp: function(companyDelete){  //remove
        console.log('Deleting company info');
        $http({
          method: 'POST',
          url: 'http://192.168.12.159:3000/api/company/delete',
          data: companyDelete
        }).then(function successCallback(response) {
          console.log('done');
          }, function errorCallback(response) {
            console.log('not working');
          });
      },
      updateCorp: function(companyUpdate){  //update
        console.log('Updating company info');
        $http({
          method: 'POST',
          url: 'http://192.168.12.159:3000/api/company/update',
          data: companyUpdate
        }).then(function successCallback(response) {
          console.log(response);
          }, function errorCallback(response) {
            console.log(response);
          });
      },
      queryCorp: function(companyQuery){  //query
        var deferred = $q.defer();
        console.log('Querying company info');
        $http({
          method: 'POST',
          url: 'http://192.168.12.159:3000/api/company/query',
          data: companyQuery
        }).then(function successCallback(response) {
          console.log(response.data);
          deferred.resolve(response.data);
          }, function errorCallback(response) {
            deferred.reject(response.data);
          });

          return deferred.promise;
      }
    }
  })
  .controller('CorpController', function($scope, $rootScope, $http, $state, CMService) {
    $scope.department = [{deptid: 'a001', deptn: 'abc'}];

    $scope.word = 'ahehehe';

    $scope.companyInsert = {
      chiname: '',
      engname: '',
      code: '',
      description: '',
      department: $scope.department//
    }

    $scope.companyDelete = {
      chiname: 'joseph',
      engname: 'joseph',
      code: 'a001',
      description: 'abc',
      department: $scope.department
    }

    $scope.companyUpdate = {
      chiname: 'joseph',
      engname: 'joseph',
      code: 'a001',
      description: 'abc',
      department: $scope.department
    }

    $scope.companyQuery = {
      deptid: '',//
      deptn: '',//
      start_date: '',//
      end_date: '',//
      id: '',
      chiname: '',
      engname: '',
      code: '',
      status: ''
    }

    $scope.companyInfo = {"_id":"57bfddc3efe74d4c08a497bf",
      "id":"c0006",
      "chiname":"王小明建築公司",
      "engname":"WSM Professional Architecture",
      "code":"WSMA",
      "status":"Active",
      "description": "Welcome to have a high quality service",
      "department":[{"_id":"LAW","name":""}]
    };

    $scope.insertCorp = function() {
      $scope.department.push({deptid: 'i001', deptn: 'it'});
      CMService.insertCorp($scope.companyInsert);
    }

    $scope.updateCorp = function() {
      CMService.removeCorp($scope.companyDelete);
    }

    $scope.updateCorp = function() {
      console.log('upating');
      CMService.updateCorp($scope.companyUpdate);
    }

    $scope.queryCorp = function() {
      console.log('querying');
      CMService.queryCorp($scope.companyQuery).then(function(a)
        {$scope.companyInfo = a;}
      );
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
