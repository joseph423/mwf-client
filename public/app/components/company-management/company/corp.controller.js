//This - Company management - is fully functional, it means the program is already worked

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
  .service('CMService', function($http, $state, $q){
    return {
      insertCorp: function(companyInsert){  //insert
        var deferred = $q.defer();

        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/company/insert',
          data: companyInsert
        }).then(function successCallback(response) {
          console.log('DONE');
            $state.reload();
          }, function errorCallback(response) {
            console.log('not working');
            deferred.resolve(response.data);
          });

          return deferred.promise;
      },
      removeCorp: function(id){  //remove
        console.log(id);
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/company/delete',
          data: id
        }).then(function successCallback(response) {
          $state.reload();
          }, function errorCallback(response) {
          });
      },
      updateCorp: function(companyUpdate){  //update
        $http({
          method: 'PATCH',
          url: 'http://localhost:3000/api/company/update',
          data: companyUpdate
        }).then(function successCallback(response) {
          $state.reload();
          }, function errorCallback(response) {
          });
      },
      queryCorp: function(companyQuery){  //query
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/company/query',
          data: companyQuery
        }).then(function successCallback(response) {
          deferred.resolve(response.data);
          }, function errorCallback(response) {
            deferred.resolve(response.data);
          });

          return deferred.promise;
      }
    }
  })
  .controller('CorpController', function($scope, $rootScope, $http, $state, CMService) {
    $scope.companyInfo;
    $scope.dept = [];


//insertCorp
    $scope.errMsg;

    $scope.insertCorp = function() {
      CMService.insertCorp($scope.companyInsert).then(function(msg) {
        $scope.errMsg = msg;
        $('#mobtn').click();
      });
    }

    $scope.companyInsert = {
      chiname: '',
      engname: '',
      code: '',
      description: '',
      department: $scope.dept
    }

    $scope.removeNewDept = function(index) {
      $scope.companyInsert.department.splice(index, 1);
    };
//end of insertCorp




//update function and variable
    $scope.updateCorp = function() {
      CMService.updateCorp($scope.modiInfo);
    };

    $scope.modiInfo;
    $scope.deptInfo = {_id: '', name: ''};

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

    $scope.nullMsg = '';

    $scope.addDept = function() {
      if($scope.deptInfo._id != '' && $scope.deptInfo.name != ''){
        $scope.dept.push({_id: $scope.deptInfo._id, name: $scope.deptInfo.name});
        $scope.deptInfo._id = '';
        $scope.deptInfo.name = '';
        $scope.nullMsg = '';
      }else{
        $scope.nullMsg = 'Department ID and Name cannot be empty';
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



//company query
$scope.deptIdQuery = [];
$scope.deptNameQuery = [];

$scope.companyQuery = {
  id: '',
  chiname: '',
  engname: '',
  code: '',
  status: '',
  deptid: $scope.deptIdQuery,
  deptn: $scope.deptNameQuery,
  start_date: '',
  end_date: ''
}

$scope.nullId = '';
$scope.addDeptId = function() {
  if($scope.deptInfo._id != ''){
    $scope.deptIdQuery.push($scope.deptInfo._id);
    $scope.deptInfo._id = '';
    $scope.nullId = '';
  }else{
    $scope.nullId = 'Department ID cannot be empty';
  }
};

$scope.nullName = '';
$scope.addDeptName = function() {
  if($scope.deptInfo.name != ''){
    $scope.deptNameQuery.push($scope.deptInfo.name);
    $scope.deptInfo.name = '';
    $scope.nullName = '';
  }else{
    $scope.nullName = 'Department Name cannot be empty';
  }
};

$scope.removeDeptId = function(index) {
  $scope.companyQuery.deptid.splice(index, 1);
};

$scope.removeDeptName = function(index) {
  $scope.companyQuery.deptn.splice(index, 1);
};
//end of query









//company delete
$scope.deleteCorp = function() {
  CMService.removeCorp({id: $scope.delID.id});
}

$scope.delID;

$scope.setDelInfo = function(info) {
  $scope.delID = info;
}


//end of delete




//company query
    $scope.queryCorp = function() {
      CMService.queryCorp($scope.companyQuery).then(function(data) {
        $scope.companyInfo = data;
      });
    }

    //end of company query
    $scope.clearFilter = function() {
      $scope.companyQuery = {
        id: '',
        chiname: '',
        engname: '',
        code: '',
        status: '',
        deptid: [],
        deptn: [],
        start_date: '',
        end_date: ''
      }
    }

    $scope.signout = function(){
      $state.go('login');
    }

    //init
    if($state.is('updateCorp'))
      $scope.queryCorp();
  });
