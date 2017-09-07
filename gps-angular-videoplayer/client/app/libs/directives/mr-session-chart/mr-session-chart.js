/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrSessionChart", ["com.mondayreplay.libs.AssetsManager"])
        .directive("mrSessionChart", ["AssetsManager", function (AssetsManager) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-session-chart/mr-session-chart.html",
                scope: {
                    session: "=",
                    clips: "=",
                    currentClip: "=",
                    currentClipPosition: "=",
                    trackProperties: "=",
                    selectedTrackPointIndex: "=",
                    onClipClick: "=",
                    onTrackClick: "=",
                    onTrackOver: "=",
                    onTrackOut: "="
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

                    Highcharts.setOptions({
                        global: {
                            useUTC: false
                        }
                    });

                    $scope.$watch("session", function (session) {
                        $scope.updateChart();
                    });

                    $scope.$watch("currentClip", function (currentClip) {
                        $scope.updateCurrentClipPosition();
                    });

                    $scope.$watch("currentClipPosition", function (currentClipPosition) {
                        $scope.updateCurrentClipPosition();
                    });

                    $scope.$watch("trackProperties", function (trackProperties) {
                        $scope.updateChart();
                    });

                    $scope.$watch("selectedTrackPointIndex", function (selectedTrackPointIndex) {
                        if ($scope.trackProperties && selectedTrackPointIndex) {
                            var time = $scope.trackProperties.times[selectedTrackPointIndex];

                            if (!$scope.selectedPositionLine) {
                                $scope.selectedPositionLine = $scope.chart.xAxis[0].addPlotLine({
                                    id: "selectedPositionLine",
                                    color: "#DA322C",
                                    value: time,
                                    width: 2
                                });
                            } else {
                                $.extend($scope.selectedPositionLine.options, {
                                    value: time
                                });
                                $scope.selectedPositionLine.render();
                            }
                        } else {
                            if ($scope.selectedPositionLine) {
                                $scope.chart.xAxis[0].removePlotBandOrLine("selectedPositionLine");
                                $scope.selectedPositionLine = null;
                            }
                        }
                    });

                    $scope.updateCurrentClipPosition = function () {
                        if ($scope.trackProperties && $scope.currentClip && $scope.currentClipPosition) {
                            var time = $scope.currentClip.timetaken + $scope.clipsTrackOffset + $scope.currentClipPosition;

                            if (!$scope.currentClipPositionLine || _.isEmpty($scope.currentClipPositionLine) === true) {
                                $scope.currentClipPositionLine = $scope.chart.xAxis[0].addPlotLine({
                                    id: "currentClipPositionLine",
                                    color: "#DA322C",
                                    value: new Date(time),
                                    width: 2
                                });
                            } else {
                                $.extend($scope.currentClipPositionLine.options, {
                                    value: new Date(time)
                                });
                                $scope.currentClipPositionLine.render();
                            }
                        }
                    };

                    $scope.updateChart = function () {
                        if ($scope.trackProperties) {
                            $scope.loading = false;

                            // calculate offset
                            if ($scope.session.clipsTrackOffset == undefined) {
                                if ($scope.clips.length > 0) {
                                    var firstClipDatetime = $scope.clips[0].timetaken;
                                    if (firstClipDatetime < new Date($scope.trackProperties.times[0]).getTime()
                                            || firstClipDatetime > $scope.trackProperties.times[$scope.trackProperties.times.length - 1]) {
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

                            var speedDatapoints = [];
                            var elevationDatapoints = [];
                            for (var i = 0; i < $scope.trackProperties.times.length; i++) {
                                var time = $scope.trackProperties.times[i];

                                if ($scope.trackProperties.speed) {
                                    speedDatapoints.push([time, $scope.trackProperties.speed[i] * 3.6]);
                                }

                                if ($scope.trackProperties.elevation) {
                                    elevationDatapoints.push([time, $scope.trackProperties.elevation[i]]);
                                }
                            }

                            var series = [];
                            if (elevationDatapoints.length > 0) {
                                series.push({
                                    yAxis: 0,
                                    name: 'Elevation',
                                    data: elevationDatapoints,
                                    tooltip: {
                                        valueSuffix: ' m'
                                    }
                                });
                            }
                            if (speedDatapoints.length > 0) {
                                series.push({
                                    yAxis: 1,
                                    name: 'Speed',
                                    data: speedDatapoints,
                                    tooltip: {
                                        valueDecimals: 0,
                                        valueSuffix: ' km/h'
                                    }
                                });
                            }

                            // create plot band for clip
                            var clipsPlotBands = $scope.clips.map(function (currentValue, index) {
                                var time = currentValue.timetaken + $scope.clipsTrackOffset;
                                var clipIndex = getClosestPoint($scope.trackProperties.times, time);

                                return {
                                    color: '#F2E7B2',
                                    from: $scope.trackProperties.times[clipIndex],
                                    to: $scope.trackProperties.times[clipIndex] + currentValue.duration,
                                    events: {
                                        click: function () {
                                            if ($scope.onClipClick) {
                                                $scope.onClipClick(currentValue);
                                            }
                                        }
                                    },
                                    label: {
                                        text: index+1
                                    }
                                };
                            });

                            $scope.chart = new Highcharts.Chart({
                                colors: ['#0F72B5', '#77A942', '#604042'],
                                chart: {
                                    renderTo: 'sessionChartContainer',
                                    zoomType: 'x'
                                },
                                title: {
                                    text: ''
                                },
                                xAxis: {
                                    //crosshair: true,
                                    type: 'datetime',
                                    plotBands: clipsPlotBands
                                },
                                yAxis: [{
                                    title: {
                                        text: ''
                                    },
                                    labels: {
                                        format: '{value} m'
                                    }
                                }, {
                                    title: {
                                        text: ''
                                    },
                                    labels: {
                                        format: '{value} km/h'
                                    },
                                    opposite: true
                                }],
                                legend: {
                                    enabled: true,
                                    align: 'right',
                                    verticalAlign: 'bottom'
                                },
                                tooltip: {
                                    shared: true
                                },
                                credits: {
                                    enabled: false
                                },
                                plotOptions: {
                                    series: {
                                        point: {
                                            events: {
                                                click: function () {
                                                    if ($scope.onTrackClick) {
                                                        $scope.onTrackClick(this.index);
                                                    }
                                                },
                                                mouseOver: function () {
                                                    if ($scope.onTrackOver) {
                                                        $scope.onTrackOver(this.index);
                                                    }
                                                },
                                                mouseOut: function () {
                                                    if ($scope.onTrackOut) {
                                                        $scope.onTrackOut();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                series: series
                            });

                            // update current clip position
                            $scope.updateCurrentClipPosition();
                        }
                    };

                }
            };
        }]);
})();