angular
  .module('app')
  .directive('searchAtt', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/project/searchAtt.html',
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
  .service('AttService', function($http, $state, $q){
    return {
      insertProj: function(projectInsert){  //insert
        var deferred = $q.defer();

        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/projects/insert',
          data: projectInsert
        }).then(function successCallback(response) {
          console.log('DONE');
            $state.reload();
          }, function errorCallback(response) {
            console.log('not working');
            deferred.resolve(response.data);
          });

          return deferred.promise;
      },
      removeProj: function(id){  //remove
        console.log(id);
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/projects/delete',
          data: id
        }).then(function successCallback(response) {
          $state.reload();
          }, function errorCallback(response) {
          });
      },
      updateProj: function(projectUpdate){  //update
        $http({
          method: 'PATCH',
          url: 'http://localhost:3000/api/projects/update',
          data: companyUpdate
        }).then(function successCallback(response) {
          $state.reload();
          }, function errorCallback(response) {
          });
      },
      queryProj: function(projectQuery){  //query
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/projects/query',
          data: projectQuery
        }).then(function successCallback(response) {
          deferred.resolve(response.data);
          }, function errorCallback(response) {
            deferred.resolve(response.data);
          });

          return deferred.promise;
      }
    }
  })
  .controller('AttController', function($scope, $rootScope, $http, $state, AttService) {
    $scope.projectInfo;
    $scope.involvedStaff = [];
    $scope.staff = '';


//insertCorp
    $scope.errMsg;

    $scope.insertProj = function() {
      AttService.insertProj($scope.projectInsert).then(function(msg) {
        $scope.errMsg = msg;
        $('#mobtn').click();
      });
    }

    $scope.attendInsert = {
      sid: '',
      status: '',
      recorddate: new Date(),
      recordtime: new Date(),
      iBeaconNo: '',
      remarks: ''
    }

    $scope.removeNewDept = function(index) {
      $scope.projectInsert.department.splice(index, 1);
    };
//end of insertCorp




//update function and variable
    $scope.updateProj = function() {
      AttService.updateProj($scope.modiInfo);
    };

    $scope.modiInfo;


    $scope.setModiInfo = function(info) {
      $scope.involvedStaff = [];

      for(var i = 0;i < info.staff.length; i++){
        $scope.involvedStaff.push(info.staff[i]);
      }

      $scope.modiInfo = { pid: info.id,
                          chiname: info.chiname,
                          engname: info.engname,
                          type: info.type,
                          description: info.description,
                          address: info.address,
                          start_date: info.start_date,
                          end_date: info.end_date,
                          assigned_date: info.assigned_date,
                          staff: $scope.involvedStaff
                        };
    };

    $scope.nullMsg = '';

    $scope.addStaffId = function() {
      if($scope.staff != ''){
        $scope.involvedStaff.push($scope.staff);
        $scope.staff = '';
        $scope.nullMsg = '';
      }else{
        $scope.nullMsg = 'Staff ID cannot be empty';
      }
    };

    $scope.removeStaff = function(index) {
      $scope.modiInfo.staff.splice(index, 1);
    };
//end of update



  //company query
  $scope.staffIdQuery = [];

  $scope.projectQuery = {
    pid: '',
    chiname: '',
    engname: '',
    address: '',
    type: '',
    start_date: '',
    end_date: '',
    astart_date: '',
    aend_date: '',
    staff: $scope.staffIdQuery
  }

  $scope.nullId = '';
  $scope.addStaffName = function() {
    if($scope.staff != ''){
      $scope.staffIdQuery.push($scope.staff);
      $scope.staff = '';
      $scope.nullId = '';
    }else{
      $scope.nullId = 'Staff Id cannot be empty';
    }
  };


  $scope.removeStaffId = function(index) {
    $scope.projectQuery.staff.splice(index, 1);
  };
  //end of query









//company delete
$scope.deleteProj = function() {
  AttService.removeProj({pid: $scope.delID.pid});
}

$scope.delID;

$scope.setDelInfo = function(info) {
  $scope.delID = info;
}


//end of delete




//company query
    $scope.queryProj = function() {
      AttService.queryProj($scope.projectQuery).then(function(data) {
        $scope.projectInfo = data;
      });
    }

    //end of company query
    $scope.clearFilter = function() {
      $scope.projectQuery = {
        pid: '',
        chiname: '',
        engname: '',
        address: '',
        type: '',
        start_date: '',
        end_date: '',
        astart_date: '',
        aend_date: '',
        staff: $scope.staffIdQuery
      }
    }

    $scope.signout = function(){
      $state.go('login');
    }

    //init
    if($state.is('updateProj'))
      $scope.queryProj();
  });
