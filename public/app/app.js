angular
  .module('app', ['ui.router'])
  .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', { //login state
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/pages/common/login/login.html'
      })

      .state('main', {  //pages of super user
        url: '/main',
        controller: 'FrameController',
        templateUrl: 'app/pages/common/main-page/frame.html'
      })
      .state('main.management', {
        abstract: true,
        template: '<div ui-view=""></div>'
      })



      //Company Account
      .state('insertCorpA', {
        url: '/user/company/company_administrator/new_company_account',
        parent: 'main.management',
        controller: 'CorpAccController',
        templateUrl: 'app/components/account/company/insert.html'
      })
      .state('updateCorpA', {
        url: '/user/company/company_administrator/modification_and_deletion',
        parent: 'main.management',
        controller: 'CorpAccController',
        templateUrl: 'app/components/account/company/update.html'
      })


      //Department Account
      .state('insertDeptA', {
        url: '/user/company/department_administrator/new_department_account',
        parent: 'main.management',
        controller: 'DeptAccController',
        templateUrl: 'app/components/account/department/insert.html'
      })
      .state('updateDeptA', {
        url: '/user/company/department_administrator/modification_and_deletion',
        parent: 'main.management',
        controller: 'DeptAccController',
        templateUrl: 'app/components/account/department/update.html'
      })


      //Employee Account
      .state('insertEmplyA', {
        url: '/user/company/employee/new_employee_account',
        parent: 'main.management',
        controller: 'EmplyAccController',
        templateUrl: 'app/components/account/employee/insert.html'
      })
      .state('updateEmplyA', {
        url: '/user/company/employee/modification_and_deletion',
        parent: 'main.management',
        controller: 'EmplyAccController',
        templateUrl: 'app/components/account/employee/update.html'
      })



      //company management
      .state('insertCorp', {
        url: '/company_management/insert',
        parent: 'main.management',
        controller: 'CorpController',
        templateUrl: 'app/components/company-management/company/insert.html'
      })
      .state('updateCorp', {
        url: '/company_management/modification_and_deletion',
        parent: 'main.management',
        controller: 'CorpController',
        templateUrl: 'app/components/company-management/company/update.html'
      })

      //projects
      .state('insertProj', {
        url: '/projects/new_projects',
        parent: 'main.management',
        controller: 'ProjController',
        templateUrl: 'app/components/project/insert.html'
      })
      .state('updateProj', {
        url: '/projects/modification_and_deletion',
        parent: 'main.management',
        controller: 'ProjController',
        templateUrl: 'app/components/project/update.html'
      })


      //attandence
      .state('insertAtt', {
        url: '/attentance/new_attandence',
        parent: 'main.management',
        controller: 'AttController',
        templateUrl: 'app/components/attentance/insert.html'
      })
      .state('updateAtt', {
        url: '/attentance/modification_and_deletion',
        parent: 'main.management',
        controller: 'AttController',
        templateUrl: 'app/components/attentance/update.html'
      })


      .state('corpAdmin', {
        url: '/corpAdmin',
        controller: 'CorpAdminController',
        templateUrl: 'app/pages/user/corpAdmin/corpAdmin.html'
      })
      .state('depAdmin', {
        url: '/depAdmin',
        controller: 'DepAdminController',
        templateUrl: 'app/pages/user/depAdmin/depAdmin.html'
      })
      .state('employee', {
        url: '/employee',
        controller: 'EmployeeController',
        templateUrl: 'app/pages/user/employee/employee.html'
      })
  })
  .controller('AppController', function($rootScope, $scope, $state) {
    $rootScope.serverIp = '192.168.12.159:3000';

    $rootScope.permission;

    $scope.parentName = 'su.manaement';

    $scope.type = 'content';

    $rootScope.getClass = function() {
      if($state.is('login')) {
        return 'login';
      } else {
        return 'nav-md';
      }
    }
  })
