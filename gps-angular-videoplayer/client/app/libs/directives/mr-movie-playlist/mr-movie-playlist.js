/*eslint */
/*global angular */
( function() {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrMoviePlaylist", ["com.mondayreplay.libs.AssetsManager"])
        .directive("mrMoviePlaylist", ["AssetsManager", function (AssetsManager) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-movie-playlist/mr-movie-playlist.html",
                scope: {
                    movie: "=",
                    active: "=",
                    onMovieClick: "="
                },
                link: function($scope, $element){
                    $scope.getThumbnail = AssetsManager.movieThumbnail;

                    $scope.click = function() {
                        if($scope.onMovieClick && angular.isFunction($scope.onMovieClick)){
                            $scope.onMovieClick($scope.movie);
                        }
                    };

                    var moviePreview = $element.find(".mr-movie-playlist");
                    // adjust clip preview height on resize
                    moviePreview.height(parseInt(moviePreview.width() * 360 / 640));

                    var onResize = function () {
                        moviePreview.height(parseInt(moviePreview.width() * 360 / 640));
                    };

                    $scope.getPlaylistListDimensions = function () {
                        var playlistList = moviePreview.parents('.playlist-list');
                        return { 'h': playlistList.height(), 'w': playlistList.width() };
                    };

                    $scope.$watch($scope.getPlaylistListDimensions, function (newValue, oldValue) {
                        if(newValue){
                            onResize();
                        }
                    }, true);

                    $(window).resize(onResize());

                }
            };
        }]);
    }
)();
