/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrMovieCard", [
            "com.mondayreplay.libs.AssetsManager",
            "com.mondayreplay.libs.directives.mrMovieComments"
        ])
        .directive("mrMovieCard", ["$filter", "$state", "$window", "logger", "utils", "Movie", "AssetsManager", function ($filter, $state, $window, logger, utils, Movie, AssetsManager) {
            return {
                restrict: "E",
                templateUrl: function (elem, attr) {
                    return attr.isTimelineCard == "true"
                        ? "app/libs/directives/mr-movie-card/mr-movie-timeline-card.html"
                        : "app/libs/directives/mr-movie-card/mr-movie-card.html";
                },
                scope: {
                    movie: "=",
                    isTimelineCard: "=",
                    timelineObj: "=",
                    timelineCtrl: "=timelineController"
                },
                controller: function ($scope, $element) {
                },
                link: function ($scope, elem) {
                    $scope.getShareUrl = function(){
                        return $window.location.origin + $state.href('movie', { movieId: $scope.movie.id });
                    };

                    $scope.getThumbnail = function () {
                        return AssetsManager.movieThumbnail($scope.movie);
                    };

                    $scope.like = function () {
                        Movie.like($scope.movie.id, function (data) {
                            $scope.movie.likes = $scope.movie.likes + 1;
                            $scope.movie.liked = true;

                            ga('send', 'event', "movie", "like", $scope.movie.id);

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
