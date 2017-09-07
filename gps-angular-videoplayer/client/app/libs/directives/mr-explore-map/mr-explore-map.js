/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrExploreMap", ["ui-leaflet", "com.mondayreplay.libs.AssetsManager"])
        .directive("mrExploreMap", ["Place", "AssetsManager", function (Place, AssetsManager) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-explore-map/mr-explore-map.html",
                scope: {
                    onUpdateBounds: "=",
                    onPlaceClick: "="
                },
                controller: function ($scope) {
                    $scope.loading = false;


                    $scope.$on("leafletDirectiveMap.exploreMap.moveend", function (event, args) {
                        var polygonGeometry = undefined;
                        if (args.leafletObject.getZoom() != args.leafletObject.getMinZoom()) {
                            var bounds = args.leafletObject.getBounds();

                            var latNorth = bounds._northEast.lat;
                            var latSouth = bounds._southWest.lat;
                            var lngEast = bounds._northEast.lng;
                            var lngWest = bounds._southWest.lng;

                            var polygon = L.polygon([
                                L.latLng(latNorth, lngWest),
                                L.latLng(latNorth, lngEast),
                                L.latLng(latSouth, lngEast),
                                L.latLng(latSouth, lngWest),
                                L.latLng(latNorth, lngWest)
                            ]);

                            polygonGeometry = polygon.toGeoJSON().geometry;
                        }

                        if ($scope.onUpdateBounds) {
                            $scope.onUpdateBounds(polygonGeometry);
                        }

                        if (polygonGeometry) {
                            Place.searchByPolygon(undefined, polygonGeometry, 0, 0, function (data) {
                                // create markers for places
                                var markers = data.places.map(function (currentValue) {
                                    var icon;
                                    if (currentValue.placeType == "SPOT") {
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

                                    return {
                                        lat: currentValue.position.coordinates[1],
                                        lng: currentValue.position.coordinates[0],
                                        focus: true,
                                        draggable: false,
                                        icon: icon,
                                        place: currentValue
                                    }
                                });

                                // add spot and location to the map
                                angular.extend($scope, {
                                    markers: markers
                                });

                            }, function (data, status) {

                            });

                        } else {
                            // add spot and location to the map
                            angular.extend($scope, {
                                markers: []
                            });
                        }

                    });

                    $scope.$on("leafletDirectiveMarker.exploreMap.click", function (event, args) {
                        if (args.model.place && $scope.onPlaceClick) {
                            $scope.onPlaceClick(args.model.place);
                        }
                    });


                    angular.extend($scope, {
                        defaults: {
                            tileLayer: "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
                            scrollWheelZoom: false,
                            minZoom: 2
                        },
                        events: {
                            map: {
                                enable: ["moveend"],
                                logic: "emit"
                            },
                            markers: {
                                enable: ["click"],
                                logic: "emit"
                            }
                        },
                        center: {}
                    });
                }
            };
        }]);
})();