angular.module('SLVIApp', ['ui.router', 'ui.bootstrap', 'templates', 'ngSanitize', 'ngCsv'])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('main', {
          url: '/main',
          templateUrl: 'assets/templates/main.html',
          controller: 'MainCtrl',
          controllerAs: 'ctx'
        });

      $urlRouterProvider.otherwise('main');
    }]
  );