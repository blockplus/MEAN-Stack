/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrPlaceMap", ["ui-leaflet"])
        .directive("mrPlaceMap", [function () {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-place-map/mr-place-map.html",
                scope: {
                    place: "="
                },
                controller: function ($scope) {
                    var icon;
                    if ($scope.place.placeType == "SPOT") {
                        icon = {
                            type: "awesomeMarker",
                            icon: "star",
                            markerColor: "red"
                        };
                    } else {
                        icon = {
                            type: "awesomeMarker",
                            icon: undefined,
                            markerColor: "blue"
                        };
                    }

                    var markers = [
                        {
                            lat: $scope.place.position.coordinates[1],
                            lng: $scope.place.position.coordinates[0],
                            focus: true,
                            draggable: false,
                            icon: icon,
                            place: $scope.place
                        }
                    ];

                    var center = {
                        lat: $scope.place.position.coordinates[1],
                        lng: $scope.place.position.coordinates[0],
                        zoom: 14
                    };

                    angular.extend($scope, {
                        defaults: {
                            tileLayer: "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
                            scrollWheelZoom: false,
                            minZoom: 2
                        },
                        markers: markers,
                        center: center
                    });
                }
            };
        }]);
})();