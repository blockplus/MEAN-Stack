/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrSessionMap", ["ui-leaflet", "com.mondayreplay.libs.AssetsManager"])
        .directive("mrSessionMap", ["leafletData", "AssetsManager", function (leafletData, AssetsManager) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-session-map/mr-session-map.html",
                scope: {
                    session: "=",
                    clips: "=",
                    currentClip: "=",
                    currentClipPosition: "=",
                    track: "=",
                    trackProperties: "=",
                    selectedTrackPointIndex: "=",
                    onClipClick: "=",
                    onTrackClick: "=",
                    onTrackOver: "=",
                    onTrackOut: "=",
                    isFullscreen: "="
                },
                controller: function ($scope, $element) {
                    var getClosestPoint = function (times, time) {
                        var lo = 0;
                        var hi = times.length - 1;
                        var mid;
                        while (hi - lo > 1) {
                            mid = Math.floor((lo + hi) / 2);
                            if (times[mid] < time) {
                                lo = mid;
                            } else {
                                hi = mid;
                            }
                        }
                        if (time - times[lo] <= times[hi] - time) {
                            return lo;
                        }
                        return hi;
                    };

                    $scope.loading = true;
                    $scope.autocenterCurrentClip = true;

                    $scope.$on("leafletDirectiveMarker.sessionMap.click", function (event, args) {
                        if (args.model.clip && $scope.onClipClick) {
                            $scope.onClipClick(args.model.clip);
                        }
                    });

                    $scope.$on("leafletDirectivePath.sessionMap.click", function (event, args) {
                        if ($scope.onTrackClick) {
                            $scope.onTrackClick(args.leafletObject.options.point);
                        }
                    });

                    $scope.$on("leafletDirectiveMap.sessionMap.mousemove", function (event, args) {
                        if ($scope.trackPointsTree) {

                            var metersPerPixel = 40075016.686 * Math.abs(Math.cos(args.leafletObject.getCenter().lat * 180 / Math.PI)) / Math.pow(2, args.leafletObject.getZoom() + 8);
                            var buffer = L.circle(args.leafletEvent.latlng, 8 * metersPerPixel).getBounds();
                            var NE = buffer.getNorthEast();
                            var SW = buffer.getSouthWest();

                            //lookup the track points tree to find the point around the mouse cursor
                            var neighbors = $scope.trackPointsTree.search([SW.lng, SW.lat, NE.lng, NE.lat]);

                            if (neighbors.length > 0) {
                                // find the closest point
                                var minIndex = 0;
                                var min = Infinity;
                                //search for the closest point
                                var i = 0;
                                //for (i = 0; i < neighbors.lenght; i++) {
                                while (neighbors[i]) {
                                    var diff = args.leafletEvent.latlng.distanceTo([neighbors[i][2], neighbors[i][1]]);
                                    if (diff < min) {
                                        min = diff;
                                        minIndex = i;
                                    }
                                    i++;
                                }

                                // update marker position
                                if ($scope.mouseoverMarker) {
                                    $scope.mouseoverMarker.latlngs = {lat: neighbors[minIndex][2], lng: neighbors[minIndex][1]};
                                    $scope.mouseoverMarker.point = neighbors[minIndex];

                                } else {
                                    $scope.mouseoverMarker = {
                                        type: "circleMarker",
                                        latlngs: {lat: neighbors[minIndex][2], lng: neighbors[minIndex][1]},
                                        radius: 6,
                                        fillColor: "#77A942",
                                        color: "#77A942",
                                        point: neighbors[minIndex]
                                    };
                                    $scope.paths.push($scope.mouseoverMarker);
                                }

                                if ($scope.onTrackOver) {
                                    $scope.onTrackOver(neighbors[minIndex]);
                                }

                            } else {
                                // remove marker
                                if ($scope.mouseoverMarker) {
                                    $scope.paths.pop();
                                    $scope.mouseoverMarker = null;
                                }

                                if ($scope.onTrackOut) {
                                    $scope.onTrackOut();
                                }
                            }
                        }
                    });

                    $scope.$on("leafletDirectiveMap.sessionMap.dragstart", function (event) {
                        $scope.autocenterCurrentClip = false;
                    });

                    $scope.$watch("session", function (session) {
                        if ($scope.session.place) {
                            $scope.center.lat = $scope.session.place.position.coordinates[1];
                            $scope.center.lng = $scope.session.place.position.coordinates[0];
                            $scope.center.zoom = 10;
                        }

                        $scope.currentClipMarker = null;
                        if ($scope.mouseoverMarker) {
                            $scope.paths.pop();
                            $scope.mouseoverMarker = null;
                        }

                        $scope.updateMap();
                    });

                    $scope.$watch("currentClip", function (currentClip) {
                        $scope.updateCurrentClipPosition();
                    });

                    $scope.$watch("currentClipPosition", function (currentClipPosition) {
                        $scope.updateCurrentClipPosition();
                    });

                    $scope.$watch("selectedTrackPointIndex", function (selectedTrackPointIndex) {
                        if ($scope.trackProperties && selectedTrackPointIndex) {
                            var point = $scope.trackProperties.points[selectedTrackPointIndex];

                            if ($scope.mouseoverMarker) {
                                $scope.mouseoverMarker.latlngs = {lat: point[1], lng: point[0]};

                            } else {
                                $scope.mouseoverMarker = {
                                    type: "circleMarker",
                                    latlngs: {lat: point[1], lng: point[0]},
                                    radius: 6,
                                    fillColor: "#77A942",
                                    color: "#77A942"
                                };
                                $scope.paths.push($scope.mouseoverMarker);
                            }

                        } else {
                            if ($scope.mouseoverMarker) {
                                $scope.paths.pop();
                                $scope.mouseoverMarker = null;
                            }
                        }
                    });

                    $scope.$watch("track", function (track) {
                        $scope.updateMap();
                    });

                    $scope.onCenter = function () {
                        $scope.autocenterCurrentClip = true;
                    };

                    $scope.updateCurrentClipPosition = function () {
                        if ($scope.trackProperties && $scope.currentClip && $scope.currentClipPosition) {
                            var time = $scope.currentClip.timetaken + $scope.clipsTrackOffset + $scope.currentClipPosition;
                            var index = getClosestPoint($scope.trackProperties.times, time);

                            if ($scope.currentClipMarker) {
                                $scope.currentClipMarker.lat = $scope.trackProperties.points[index][1];
                                $scope.currentClipMarker.lng = $scope.trackProperties.points[index][0];

                            } else {
                                $scope.currentClipMarker = {
                                    lat: $scope.trackProperties.points[index][1],
                                    lng: $scope.trackProperties.points[index][0],
                                    focus: true,
                                    draggable: false,
                                    icon: {
                                        type: "awesomeMarker",
                                        icon: undefined,
                                        markerColor: "red"
                                    }
                                };

                                $scope.markers.push($scope.currentClipMarker);
                            }

                            // center map if is following
                            if ($scope.autocenterCurrentClip) {
                                $scope.center.lat = $scope.currentClipMarker.lat;
                                $scope.center.lng = $scope.currentClipMarker.lng;
                            }
                        }
                    };

                    $scope.updateMap = function () {
                        if ($scope.track && $scope.trackProperties) {
                            $scope.loading = false;

                            // calculate offset
                            if ($scope.session.clipsTrackOffset == undefined) {
                                if ($scope.clips.length > 0) {
                                    var firstClipDatetime = $scope.clips[0].timetaken;
                                    if (firstClipDatetime < $scope.trackProperties.times[0] || firstClipDatetime > $scope.trackProperties.times[$scope.trackProperties.times.length - 1]) {
                                        $scope.clipsTrackOffset = $scope.trackProperties.times[0] - firstClipDatetime;
                                    } else {
                                        $scope.clipsTrackOffset = 0;
                                    }
                                } else {
                                    $scope.clipsTrackOffset = 0;
                                }
                            } else {
                                $scope.clipsTrackOffset = $scope.session.clipsTrackOffset;
                            }

                            // create points tree index for fast lookup
                            var points = $scope.trackProperties.points.map(function (currentValue, index) {
                                return [index, currentValue[0], currentValue[1]]
                            });
                            $scope.trackPointsTree = rbush(9, ["[1]", "[2]", "[1]", "[2]"]).load(points);

                            // create layer for track
                            var trackLayer = {
                                data: $scope.track,
                                style: {
                                    weight: 6,
                                    opacity: 1,
                                    color: "#77A942"
                                }
                            };

                            // create markers for clip
                            var markers = $scope.clips.map(function (currentValue, currentIndex) {
                                var time = currentValue.timetaken + $scope.clipsTrackOffset;
                                var index = getClosestPoint($scope.trackProperties.times, time);

                                return {
                                    lat: $scope.trackProperties.points[index][1],
                                    lng: $scope.trackProperties.points[index][0],
                                    focus: true,
                                    draggable: false,
                                    icon: {
                                        type: "extraMarker",
                                        icon: 'fa-number',
                                        markerColor: "blue",
                                        number: "" + (currentIndex + 1)
                                    },
                                    clip: currentValue
                                }
                            });

                            $scope.center = {
                                lat: markers[0].lat,
                                lng: markers[0].lng,
                                zoom: 15
                            };

                            // add track and clips to the map
                            angular.extend($scope, {
                                trackLayer: trackLayer,
                                markers: markers
                            });

                            // update current clip position
                            $scope.updateCurrentClipPosition();
                        }
                    };

                    $scope.toggleFullscreen = function () {
                        $scope.isFullscreen = $scope.isFullscreen == undefined ? false : !$scope.isFullscreen;
                        $element.find('#sessionMapContainer').height($scope.isFullscreen ? '100%' : '350');
                        if($scope.isFullscreen){
                            $element.parents('.main-container').addClass('inner-content-fullscreen');
                        }else{
                            $element.parents('.main-container').removeClass('inner-content-fullscreen');
                        }
                    };
                    $scope.toggleFullscreen();

                    $scope.getSessionMapContainerDimensions = function () {
                        return {'h': $element.find('#sessionMapContainer').height(), 'w': $element.find('#sessionMapContainer').width()};
                    };

                    $scope.$watch($scope.getSessionMapContainerDimensions, function (newValue, oldValue) {
                        if (newValue) {
                            leafletData.getMap().then(function (map) {
                                map.invalidateSize();
                            });
                        }
                    }, true);

                    angular.extend($scope, {
                        defaults: {
                            tileLayer: "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
                            scrollWheelZoom: false,
                            minZoom: 3
                        },
                        events: {
                            map: {
                                enable: ["mousemove", "dragstart"],
                                logic: "emit"
                            },
                            markers: {
                                enable: ["click"],
                                logic: "emit"
                            },
                            path: {
                                enable: ["click"],
                                logic: "emit"
                            }
                        },
                        center: {},
                        paths: []
                    });
                },
                link: function (scope, elem) {

                }
            };
        }]);
})();