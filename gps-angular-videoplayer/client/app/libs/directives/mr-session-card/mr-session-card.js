/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrSessionCard", ["com.mondayreplay.libs.AssetsManager", "com.mondayreplay.libs.directives.mrSessionComments"])
        .directive("mrSessionCard", ["$filter", "$state", "$window", "logger", "Session", "AssetsManager", function ($filter, $state, $window, logger, Session, AssetsManager) {
            return {
                restrict: "E",
                templateUrl: function (elem, attr) {
                    return attr.isTimelineCard == "true"
                        ? "app/libs/directives/mr-session-card/mr-session-timeline-card.html"
                        : "app/libs/directives/mr-session-card/mr-session-card.html";
                },
                scope: {
                    session: "=",
                    isTimelineCard: "=",
                    timelineObj: "=",
                    timelineCtrl: "=timelineController"
                },
                controller: function ($scope, $element) {
                },
                link: function ($scope, elem) {
                    $scope.getShareUrl = function(){
                        return $window.location.origin + $state.href('session', { sessionId: $scope.session.id });
                    };

                    $scope.getThumbnail = function (clipIndex) {
                        return AssetsManager.sessionThumbnail($scope.session, clipIndex);
                    };

                    $scope.like = function () {
                        Session.like($scope.session.id, function (data) {
                            $scope.session.likes = $scope.session.likes + 1;
                            $scope.session.liked = true;

                            ga('send', 'event', "session", "like", $scope.session.id);

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
