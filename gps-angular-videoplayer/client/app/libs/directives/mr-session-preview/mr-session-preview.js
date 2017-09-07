/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrSessionPreview", ["com.mondayreplay.libs.AssetsManager"])
        .directive("mrSessionPreview", ["$filter", "AssetsManager", function ($filter, AssetsManager) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-session-preview/mr-session-preview.html",
                scope: {
                    session: "="
                },
                link: function ($scope, $element) {
                    $scope.sessionThumbnail = AssetsManager.sessionThumbnail;

                    var img = $element.find("img");
                    img.css("min-height", img.width * 360 / 640);
                }
            };
        }]);
})();
