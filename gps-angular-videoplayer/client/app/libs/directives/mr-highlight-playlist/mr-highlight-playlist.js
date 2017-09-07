/*eslint */
/*global angular */
( function() {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrHighlightPlaylist", ["com.mondayreplay.libs.AssetsManager"])
        .directive("mrHighlightPlaylist", ["AssetsManager", function (AssetsManager) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-highlight-playlist/mr-highlight-playlist.html",
                scope: {
                    highlight: "=",
                    active: "=",
                    onHighlightClick: "="
                },
                link: function($scope, $element){
                    $scope.getThumbnail = AssetsManager.highlightThumbnail;

                    $scope.click = function() {
                        if($scope.onHighlightClick && angular.isFunction($scope.onHighlightClick)){
                            $scope.onHighlightClick($scope.highlight);
                        }
                    };

                    var highlightPreview = $element.find(".mr-highlight-playlist");
                    // adjust clip preview height on resize
                    highlightPreview.height(parseInt(highlightPreview.width() * 360 / 640));

                    var onResize = function () {
                        highlightPreview.height(parseInt(highlightPreview.width() * 360 / 640));
                    };

                    $scope.getPlaylistListDimensions = function () {
                        var playlistList = highlightPreview.parents('.playlist-list');
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
