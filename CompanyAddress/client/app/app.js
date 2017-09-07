'use strict';

var myApp = angular.module('CompanyApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'infinite-scroll',
  'updateMeta',
  'toastr'
])
  .config(function ($urlRouterProvider, $stateProvider,$routeProvider, $locationProvider, $httpProvider) {
    /*$routeProvider
      .otherwise({
        redirectTo: '/list'
      });*/
    $urlRouterProvider
      .otherwise('/list');  
    $locationProvider.html5Mode(true);
    //$httpProvider.useApplyAsync(true);
  });