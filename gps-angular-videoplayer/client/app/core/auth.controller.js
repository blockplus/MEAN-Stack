(function () {
    'use strict';

    angular.module('app')
        .controller('authCtrl', ['$scope', 'UserManager', authCtrl]);

    function authCtrl($scope, UserManager) {

        $scope.logout = function() {
            UserManager.logout();
        };

        $scope.signupWithFacebook = function() {
            UserManager.loginByFacebook();
        };

    }

})();