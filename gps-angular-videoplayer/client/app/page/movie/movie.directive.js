/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("app.movie")

        .directive("moviePlayerHeightToWatch", function () {
            return {
                restrict: 'A',
                scope: {
                    heightToWatch: "=moviePlayerHeightToWatch"
                },
                controller: function ($scope, $element) {

                    $scope.getElementDimensions = function () {
                        return { 'h': $element.height(), 'w': $element.width() };
                    };

                    $scope.$watch($scope.getElementDimensions, function (newValue, oldValue) {
                        if(newValue){
                            $scope.heightToWatch = newValue.h;
                        }
                    }, true);

                    $element.bind('resize', function () {
                        $scope.$apply();
                    });
                }
            };
        })
        .directive("moviePlaylistHeightToWatch", function () {
            return {
                restrict: 'A',
                scope: {
                    heightToWatch: "=moviePlaylistHeightToWatch"
                },
                controller: function ($scope, $element) {

                    $scope.$watch('heightToWatch', function (newValue, oldValue) {
                        if(newValue){
                            var prevSiblingsTotalHeight = 0;
                            angular.forEach($element.prevAll(),function(s){
                                prevSiblingsTotalHeight += $(s).height();
                            });
                            $element.height(newValue-prevSiblingsTotalHeight);
                        }
                    }, true);
                }
            };
        });
})();
