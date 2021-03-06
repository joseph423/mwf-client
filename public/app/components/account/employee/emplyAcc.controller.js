angular
  .module('app')
  .directive('searchEmplyAcc', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/account/employee/searchEmplyAcc.html',
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
  .service('EmplyAccService', function($http, $state, $q){
    return {
      insertUser: function(userInsert){  //insert
        var deferred = $q.defer();

        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/users/insert',
          data: userInsert
        }).then(function successCallback(response) {
          console.log('DONE');
            $state.reload();
          }, function errorCallback(response) {
            console.log('not working');
            deferred.resolve(response.data);
          });

          return deferred.promise;
      },
      removeUser: function(id){  //remove
        console.log(id);
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/users/delete',
          data: id
        }).then(function successCallback(response) {
          $state.reload();
          }, function errorCallback(response) {
            console.log(response);
          });
      },
      updateUser: function(userUpdate){  //update
        $http({
          method: 'PATCH',
          url: 'http://localhost:3000/api/users/update',
          data: userUpdate
        }).then(function successCallback(response) {
          $state.reload();
          }, function errorCallback(response) {
          });
      },
      queryUser: function(userQuery){  //query
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/users/query',
          data: userQuery
        }).then(function successCallback(response) {
          deferred.resolve(response.data);
          }, function errorCallback(response) {
            deferred.resolve(response.data);
          });

          return deferred.promise;
      }
    }
  })
  .controller('EmplyAccController', function($scope, $rootScope, $http, $state, EmplyAccService) {
    $scope.userQuery = {
      cid: '',
      sid: '',
      role: 'employee',
      iBeaconNo: '',
      gender: '',
      contactno: '',
      chiname: '',
      engname: '',
      email: '',
      worktype: '',
      bstart_date: '',
      bend_date: '',
      estart_date: '',
      eend_date: '',
      department: '',
      projectno: ['']
    }

    $scope.userInfo;

//common use
//end of common





//Insertion of User
    $scope.errMsg;

    $scope.insertUser = function() {
      console.log($scope.userInsert);
      EmplyAccService.insertUser($scope.userInsert).then(function(msg) {
        $scope.errMsg = msg;
        $('#mobtn').click();
      });
    }

    $scope.userInsert = {
      cid: '',
      email: '',
      password: '',
      chiname: '',
      engname: '',
      worktype: '',
      gender: 'Male',
      department: '',
      contactno: '',
      birthday: new Date(),
      employee_date: new Date(),
      role: 'employee'
    }

    $scope.setGender = function(gender) {
      $scope.userInsert.gender = gender;
    };
//end of insertUser



//company delete
$scope.stfID;
$scope.deleteUser = function() {
console.log($scope.stfID);
  EmplyAccService.removeUser({id: 's00016'});
}

$scope.setDelInfo = function(info) {
  console.log(info);
  alert();
  $scope.stfID = info;
}




//update function and variable

    $scope.updateEmply = function() {
      EmplyAccService.updateEmply($scope.modiInfo);
    };

    $scope.removeNewEmply = function(index) {
      $scope.companyInsert.department.splice(index, 1);
    };

    $scope.modiInfo;

    $scope.setModiInfo = function(info) {
      $scope.dept = [];
      for(var i = 0;i < info.department.length; i++){
        $scope.dept.push(info.department[i]);
      }

      $scope.deptInfo._id = '';
      $scope.deptInfo.name = '';

      $scope.modiInfo = {_id: info._id,
                          id: info.id,
                          chiname: info.chiname,
                          engname: info.engname,
                          code: info.code,
                          status: info.status,
                          description: info.description,
                          department: $scope.dept
                        };

      if(info.status == 'Active'){
        $('#statusOpt').val('Active');
      }else {
        $('#statusOpt').val('Terminated');
      }
    };

    $scope.removeDept = function(index) {
      $scope.modiInfo.department.splice(index, 1);
    };

    $('#statusOpt').change(function() {
      if($scope.modiInfo.status == 'Active'){
        $scope.modiInfo.status = 'Terminated';
      }else {
        $scope.modiInfo.status = 'Active';
      }
    });
//end of update







//company delete
$scope.deleteEmply = function() {
  EmplyAccService.removeEmply({id: $scope.delID.id});
}

$scope.delID;

$scope.setDelInfo = function(info) {
  $scope.delID = info;
}


//end of delete




//company query
    $scope.queryUser = function() {
      EmplyAccService.queryUser($scope.userQuery).then(function(data) {
        console.log($scope.userQuery);
        console.log(data);
        $scope.userInfo = data
      });
    }

    //end of company query
    $scope.clearFilter = function() {
      $scope.userQuery = {
        cid: '',
        sid: '',
        role: 'employee',
        iBeaconNo: '',
        gender: '',
        contactno: '',
        chiname: '',
        engname: '',
        email: '',
        worktype: '',
        bstart_date: '',
        bend_date: '',
        estart_date: '',
        eend_date: '',
        department: '',
        projectno: ['']
      }
    }

    $scope.signout = function(){
      $state.go('login');
    }

    //init

    if($state.is('updateEmplyA'))
      $scope.queryUser();
  });
