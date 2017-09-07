/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrBannerContest", [])
        .directive("mrBannerContest", [ function () {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-banner-contest/mr-banner-contest.html"
            };
        }]);
})();
