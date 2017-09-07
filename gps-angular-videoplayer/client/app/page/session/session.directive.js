/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("app.session")

        .directive("clipPlayerHeightToWatch", function () {
            return {
                restrict: 'A',
                scope: {
                    heightToWatch: "=clipPlayerHeightToWatch"
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
        .directive("clipPlaylistHeightToWatch", function () {
            return {
                restrict: 'A',
                scope: {
                    heightToWatch: "=clipPlaylistHeightToWatch"
                },
                controller: function ($scope, $element) {

                    $scope.$watch('heightToWatch', function (newValue, oldValue) {
                        if(newValue){
                            $element.height(newValue);
                        }
                    }, true);
                }
            };
        });
})();
