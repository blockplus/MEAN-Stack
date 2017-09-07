/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrHighlightCard", [
            "com.mondayreplay.libs.AssetsManager",
            "com.mondayreplay.libs.directives.mrHighlightComments"
        ])
        .directive("mrHighlightCard", ["$rootScope", "$filter", "$state", "$window", "logger", "utils", "Highlight", "AssetsManager", function ($rootScope, $filter, $state, $window, logger, utils, Highlight, AssetsManager) {
            return {
                restrict: "E",
                templateUrl: function (elem, attr) {
                    return attr.isTimelineCard == "true"
                        ? "app/libs/directives/mr-highlight-card/mr-highlight-timeline-card.html"
                        : "app/libs/directives/mr-highlight-card/mr-highlight-card.html";
                },
                scope: {
                    highlight: "=",
                    isTimelineCard: "=",
                    timelineObj: "=",
                    timelineCtrl: "=timelineController"
                },
                controller: function ($scope, $element) {
                    $scope.userIsAuthenticated = $rootScope.isAuthenticated;

                    $scope.toggleBusy = false;
                    $scope.toggleStarred = function(){
                        if(!$scope.toggleBusy){
                            $scope.toggleBusy = true;
                            $scope.toggleStarredIcon = $scope.highlight.starred ? 'star_border' : 'star';
                            if(!$scope.highlight.starred){
                                Highlight.markAsStarred(
                                    $scope.highlight.id,
                                    function (response) {
                                        $scope.highlight.starred = !$scope.highlight.starred;
                                        $scope.toggleStarredIcon = $scope.highlight.starred ? 'star' : 'star_border';
                                        if ($scope.onStarredToggle) {
                                            $scope.onStarredToggle($scope.highlight);
                                        }
                                        $scope.toggleBusy = false;
                                    }, function (data, status) {
                                        $scope.toggleStarredIcon = $scope.highlight.starred ? 'star' : 'star_border';
                                        $scope.toggleBusy = false;
                                        logger.logError($filter("translate")("internal_service_error"));
                                    }
                                );
                            }else{
                                Highlight.unmarkAsStarred(
                                    $scope.highlight.id,
                                    function (response) {
                                        $scope.highlight.starred = !$scope.highlight.starred;
                                        $scope.toggleStarredIcon = $scope.highlight.starred ? 'star' : 'star_border';
                                        if ($scope.onStarredToggle) {
                                            $scope.onStarredToggle($scope.highlight);
                                        }
                                        $scope.toggleBusy = false;
                                    }, function (data, status) {
                                        $scope.toggleStarredIcon = $scope.highlight.starred ? 'star' : 'star_border';
                                        $scope.toggleBusy = false;
                                        logger.logError($filter("translate")("internal_service_error"));
                                    }
                                );
                            }
                        }
                    };
                },
                link: function ($scope, elem) {
                    $scope.getShareUrl = function(){
                        return $window.location.origin + $state.href('highlight', { highlightId: $scope.highlight.id });
                    };

                    $scope.getThumbnail = function () {
                        return AssetsManager.highlightThumbnail($scope.highlight);
                    };

                    $scope.like = function () {
                        Highlight.like($scope.highlight.id, function (data) {
                            $scope.highlight.likes = $scope.highlight.likes + 1;
                            $scope.highlight.liked = true;

                            ga('send', 'event', "highlight", "like", $scope.highlight.id);

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
