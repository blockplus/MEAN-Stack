/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrMoviePlayer", ["ngSanitize", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering"])
        .directive("mrMoviePlayer", ['$sce', '$timeout', 'AssetsManager', 'VG_UTILS', function ($sce, $timeout, AssetsManager, VG_UTILS) {
            return {
                restrict: 'E',
                templateUrl: "app/libs/directives/mr-movie-player/mr-movie-player.html",
                scope: {
                    movie: "=",
                    onMoviePlayerReady: "=",
                    onCanPlayMovie: "=",
                    onCompleteMovie: "=",
                    onPrevClick: "=",
                    onNextClick: "="
                },
                controller: function ($scope, $element) {

                    $scope.onPlayerReady = function (API) {
                        $scope.API = API;
                        if ($scope.onMoviePlayerReady) {
                            $scope.onMoviePlayerReady($scope.API);
                        }
                    };

                    $scope.onCanPlay = function () {
                        if ($scope.onCanPlayMovie) {
                            $scope.onCanPlayMovie($scope.movie);
                        }
                    };

                    $scope.onCompleteVideo = function () {
                        if ($scope.onCompleteMovie) {
                            $scope.onCompleteMovie($scope.movie);
                        }
                    };

                    $scope.$watch('movie', function (movie) {
                        $scope.API.clearMedia();

                        $scope.config.sources = [
                            {src: $sce.trustAsResourceUrl(AssetsManager.movieVideo($scope.movie)), type: "video/mp4"}
                        ];

                        $scope.config.plugins.poster = AssetsManager.movieThumbnail($scope.movie);

                        $timeout(function () {
                            if (movie.formats.video640) {
                                $scope.API.setPlayback(1);
                            } else {
                                $scope.API.setPlayback(movie.playbackrate);
                            }
                        }, 0);
                    });

                },
                link: function (scope, elem) {
                    scope.config = {
                        preload: "none",
                        autoHide: false,
                        autoHideTime: 1000,
                        autoPlay: !VG_UTILS.isMobileDevice(),
                        //theme: "bower_components/videogular-themes-default/videogular.min.css",
                        plugins: {}
                    };

                    var videoangularContainer = elem.find('.videoangular-container');
                    videoangularContainer.height(parseInt(videoangularContainer.width() * 360 / 640));
                }
            };
        }]);
})();
