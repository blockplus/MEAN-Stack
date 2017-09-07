/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrHighlightPlayer", ["ngSanitize", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering"])
        .directive("mrHighlightPlayer", ['$sce', '$timeout', 'AssetsManager', 'VG_UTILS', function ($sce, $timeout, AssetsManager, VG_UTILS) {
            return {
                restrict: 'E',
                templateUrl: "app/libs/directives/mr-highlight-player/mr-highlight-player.html",
                scope: {
                    highlight: "=",
                    onHighlightPlayerReady: "=",
                    onCanPlayHighlight: "=",
                    onCompleteHighlight: "=",
                    onPrevClick: "=",
                    onNextClick: "="
                },
                controller: function ($scope, $element) {

                    $scope.onPlayerReady = function (API) {
                        $scope.API = API;
                        if ($scope.onHighlightPlayerReady) {
                            $scope.onHighlightPlayerReady($scope.API);
                        }
                    };

                    $scope.onCanPlay = function () {
                        if ($scope.onCanPlayHighlight) {
                            $scope.onCanPlayHighlight($scope.highlight);
                        }
                    };

                    $scope.onCompleteVideo = function () {
                        if ($scope.onCompleteHighlight) {
                            $scope.onCompleteHighlight($scope.highlight);
                        }
                    };

                    $scope.$watch('highlight', function (highlight) {
                        $scope.API.clearMedia();

                        if (highlight.formats.video640) {
                            $scope.config.starttime = -1;
                            $scope.config.duration = -1;

                            $scope.config.sources = [
                                {src: $sce.trustAsResourceUrl(AssetsManager.highlightVideo($scope.highlight)), type: "video/mp4"}
                            ];

                        } else {
                            // utilizzo meta dati su sorgente clip
                            $scope.config.starttime = highlight.starttime / 1000;
                            $scope.config.duration = highlight.duration / 1000;

                            $scope.config.sources = [
                                {src: $sce.trustAsResourceUrl(AssetsManager.highlightClipVideo($scope.highlight)), type: "video/mp4"}
                            ];
                        }
                        $scope.config.plugins.poster = AssetsManager.highlightThumbnail($scope.highlight);

                        $timeout(function () {
                            if (highlight.formats.video640) {
                                $scope.API.setPlayback(1);
                            } else {
                                $scope.API.setPlayback(highlight.playbackrate);
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
