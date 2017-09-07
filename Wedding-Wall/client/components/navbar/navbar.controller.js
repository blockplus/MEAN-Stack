'use strict';

angular.module('WeddingWall')
  .controller('NavbarCtrl', function ($scope, $window, $location) {
    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return $location.path().split('/')[1] === route;
    };

     $scope.login = function() {
     	//$routeProvider = "/login";
        $location.path('/login');

      };
  });
