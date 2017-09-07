(function () {
    "use strict";

    angular.module("app.place")
        .controller("placeCtrl", ["$scope", "$filter", "logger", "utils", "Session", "Checkin", "place", placeCtrl]);

    function placeCtrl($scope, $filter, logger, utils, Session, Checkin, place) {
        $scope.place = place.place;
        $scope.tabSelectedIndex = 0;

        $scope.$watch("tabSelectedIndex", function (current) {
            // google analytics tracking
            switch (current) {
                case 0:
                    ga("send", "pageview", "place_checkins");
                    break;
                case 1:
                    ga("send", "pageview", "place_sessions");
                    break;
            }

            $scope.checkins.disabled = current != 0;
            $scope.sessions.disabled = current != 1;
        });

        $scope.sessions = {
            data: [],
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.sessions.busy) return;
                utils.toggleInfiniteScrolling($scope.sessions);

                Session.sessionsByPlaceId($scope.place.id, $scope.sessions.start, $scope.sessions.limit,
                    function (data) {
                        for (var i = 0; i < data.sessions.length; i++) {
                            $scope.sessions.data.push(data.sessions[i]);
                        }
                        $scope.sessions.start = $scope.sessions.data.length;
                        utils.toggleInfiniteScrolling($scope.sessions);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.sessions);
                    }
                );
            }
        };

        $scope.checkins = {
            data: [],
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.checkins.busy) return;
                utils.toggleInfiniteScrolling($scope.checkins);

                Checkin.checkinsByPlaceId($scope.place.id, $scope.checkins.start, $scope.checkins.limit,
                    function (data) {
                        for (var i = 0; i < data.checkins.length; i++) {
                            $scope.checkins.data.push(data.checkins[i]);
                        }
                        $scope.checkins.start = $scope.checkins.data.length;
                        utils.toggleInfiniteScrolling($scope.checkins);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.checkins);
                    }
                );
            }
        };
    };

})(); 