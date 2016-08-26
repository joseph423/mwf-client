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
      .state('insertCorpAcc', {
        url: '/company_account/insert',
        parent: 'main.management',
        templateUrl: 'app/components/account/company/insert.html'
      })
      .state('updateCorpAcc', {
        url: '/company_account/update',
        parent: 'main.management',
        templateUrl: 'app/components/account/company/update.html'
      })
      .state('removeCorpAcc', {
        url: '/company_account/remove',
        parent: 'main.management',
        templateUrl: 'app/components/account/company/remove.html'
      })



      //company management
      .state('insertCorp', {
        url: '/company_management/company/insert',
        parent: 'main.management',
        controller: 'CorpController',
        templateUrl: 'app/components/company-management/company/insert.html'
      })
      .state('updateCorp', {
        url: '/company_management/company/update',
        parent: 'main.management',
        controller: 'CorpController',
        templateUrl: 'app/components/company-management/company/update.html'
      })
      .state('removeCorp', {
        url: '/company_management/company/remove',
        parent: 'main.management',
        controller: 'CorpController',
        templateUrl: 'app/components/company-management/company/remove.html'
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
