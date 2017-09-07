(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$document', '$filter', 'appConfig', 'UserManager', AppCtrl]); // overall control

    function AppCtrl($scope, $rootScope, $state, $document, $filter, appConfig, UserManager) {
        $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
        $scope.main = appConfig.main;
        $scope.main.showPageFilter = false;
        $scope.color = appConfig.color;

        UserManager.init();

        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
            $document.scrollTo(0, 0);
            if (fromState.name == "") {
                UserManager.refreshToken();
            }
        });

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams) {
            $state.go('404');
        });

    }

})();