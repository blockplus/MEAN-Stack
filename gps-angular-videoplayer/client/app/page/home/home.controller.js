(function () {
    "use strict";

    angular.module('app.home')
        .controller('homeCtrl', ["$scope", "$state", homeCtrl]);

    function homeCtrl($scope, $state) {
        // google analytics tracking
        ga("send", "pageview", "home");

        $scope.loginCallback = function () {
            $state.go("userfeed");
        };
    }

})(); 