/*eslint */
/*global angular */
( function() {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrClipPreview", ["com.mondayreplay.libs.AssetsManager", "com.mondayreplay.api.enduser.Clip"])
        .directive("mrClipPreview", ["$filter","AssetsManager", "Clip", function ($filter, AssetsManager, Clip) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-clip-preview/mr-clip-preview.html",
                scope: {
                    clip: "=",
                    position: "=",
                    owner: "=",
                    active: "=",
                    onClipDelete: "=",
                    onClipClick: "="
                },
                link: function($scope, element){
                    $scope.clipThumbnail = AssetsManager.clipThumbnail;
                    $scope.clipSprite = AssetsManager.clipSprite;

                    $scope.click = function() {
                        if($scope.onClipClick && angular.isFunction($scope.onClipClick)){
                            $scope.onClipClick($scope.clip, $scope.position);
                        }
                    };

                    $scope.deleteClick = function() {
                        Clip.delete($scope.clip.id, function () {
                            if($scope.onClipDelete && angular.isFunction($scope.onClipDelete)){
                                $scope.onClipDelete($scope.clip, $scope.position);
                            }
                        }, function (data, status) {
                            // TODO gestione errori
                        });
                    };

                    // mouse over preview effect
                    var indicatorOffset;

                    if($scope.clip.formats.sprite320) {
                        var NUMBER_OF_FRAMES = 20;
                        var indicator = element.find(".mr-clip-preview-indicator");
                        var image = element.find("img.mr-clip-preview-sprite");
                        indicatorOffset = indicator.offset().left;

                        element.on('mousemove', function (event) {
                            var offset = event.pageX - indicatorOffset;
                            var percentageOffset = offset / clipPreview.width();
                            var frameIndex = parseInt(NUMBER_OF_FRAMES * percentageOffset);
                            indicator = element.find(".mr-clip-preview-indicator");
                            image = element.find("img.mr-clip-preview-sprite");
                            indicator.css("left", offset);
                            image.css("top", -frameIndex * (clipPreview.width() * 360 / 640));
                        });

                        element.on('mouseout', function (event) {
                            image = element.find("img.mr-clip-preview-sprite");
                            image.css("top", 0);
                        });

                    }

                    // adjust clip preview height on resize
                    var clipPreview = element.find(".mr-clip-preview");
                    clipPreview.height(parseInt(clipPreview.width() * 360 / 640));

                    var onResize = function () {
                        clipPreview = element.find(".mr-clip-preview");
                        clipPreview.height(parseInt(clipPreview.width() * 360 / 640));
                        if(indicatorOffset) {
                            indicatorOffset = indicator.offset().left;
                        }
                    };

                    $scope.getClipPlaylistListDimensions = function () {
                        var clipPlaylistList = clipPreview.parents('.clip-playlist-list');
                        return { 'h': clipPlaylistList.height(), 'w': clipPlaylistList.width() };
                    };

                    $scope.$watch($scope.getClipPlaylistListDimensions, function (newValue, oldValue) {
                        if(newValue){
                            onResize();
                        }
                    }, true);

                    $(window).resize(onResize);
                }
            };
        }]);
    }
)();
