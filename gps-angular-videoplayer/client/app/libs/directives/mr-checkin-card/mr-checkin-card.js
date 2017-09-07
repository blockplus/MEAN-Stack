/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrCheckinCard", [
            "com.mondayreplay.libs.CheckinUtils",
            "com.mondayreplay.libs.AssetsManager",
            "com.mondayreplay.libs.directives.mrCheckinComments"
        ])
        .directive("mrCheckinCard", ["$filter", "$state", "logger", "CheckinUtils", "Checkin", "AssetsManager", function ($filter, $state, logger, CheckinUtils, Checkin, AssetsManager) {
            return {
                restrict: "E",
                templateUrl: function (elem, attr) {
                    return attr.isTimelineCard == "true"
                        ? "app/libs/directives/mr-checkin-card/mr-checkin-timeline-card.html"
                        : "app/libs/directives/mr-checkin-card/mr-checkin-card.html";
                },
                scope: {
                    checkin: "=",
                    isTimelineCard: "=",
                    timelineObj: "=",
                    timelineCtrl: "=timelineController"
                },
                controller: function ($scope, $element) {
                    $scope.getShareUrl = function(){
                        return $state.href('checkin', { sessionId: $scope.checkin.id });
                    }
                },
                link: function (scope, elem) {
                    scope.placeMap = function (coordinates) {
                        return AssetsManager.placeMap({
                            latitude: coordinates[1],
                            longitude: coordinates[0]
                        });
                    };
                    scope.getSportIcon = function () {
                        return CheckinUtils.getSportIcon(scope.checkin.sport);
                    };
                    scope.getSportConditionIcon = function () {
                        return CheckinUtils.getSportConditionIcon(scope.checkin.sport, scope.checkin.condition);
                    };

                    scope.like = function () {
                        Checkin.like(scope.checkin.id, function (data) {
                            scope.checkin.likes = scope.checkin.likes + 1;
                            scope.checkin.liked = true;

                            ga('send', 'event', "checkin", "like");

                        }, function (data, status) {
                            if (status == 500 && data.exception == "com.mondayreplay.api.commons.CannotPerformOperationAnymore") {
                                logger.logSuccess($filter("translate")("liked_already"));
                            } else if (status == 401) {
                                logger.log($filter("translate")("login_to_continue"));
                            } else {
                                logger.logError($filter("translate")("no_internet_connection"));
                            }
                        });
                    };
                }
            };
        }]);
})();
