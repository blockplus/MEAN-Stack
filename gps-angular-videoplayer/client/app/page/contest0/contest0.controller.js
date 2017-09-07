(function () {
    "use strict";

    angular.module("app.contest0")
        .controller("contest0Ctrl", ["$scope", "Config", contest0Ctrl]);

    function contest0Ctrl($scope, Config) {
        // google analytics tracking
        ga('send', 'pageview', "contest0");

        $scope.necomoniUrl = Config.NECOMONI_URL;


    }
})();