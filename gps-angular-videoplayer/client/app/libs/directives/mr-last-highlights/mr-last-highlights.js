/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrLastHighlights", ["com.mondayreplay.libs.directives.mrHighlightPreview", "com.mondayreplay.api.enduser.Highlight"])
        .directive("mrLastHighlights", ["$state", "Highlight", function ($state, Highlight) {
            return {
                restrict: "E",
                templateUrl: function ($elem, $attr) {
                    return "app/libs/directives/mr-last-highlights/mr-last-highlights.html";
                },
                controller: function ($scope, $element) {
                    $scope.goToHighlightPage = function(highlight){
                        $state.go("highlight",{highlightId: highlight.id });
                    };

                    Highlight.highlights(0, 8, function (data) {
                        $scope.highlights = data.highlights;

                    }, function (data, status) {
                        // TODO gestione errori
                    });
                }
            };
        }]);
})();
