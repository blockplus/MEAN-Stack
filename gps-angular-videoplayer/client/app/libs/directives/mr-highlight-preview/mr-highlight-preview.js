/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrHighlightPreview", ["com.mondayreplay.libs.AssetsManager"])
        .directive("mrHighlightPreview", ["$filter", "$state", "AssetsManager", "Highlight", "logger", function ($filter, $state, AssetsManager, Highlight, logger) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-highlight-preview/mr-highlight-preview.html",
                scope: {
                    highlight: "=",
                    onStarredToggle: "=",
                    onImageClick: "=",
                    onPlayClick: "="
                },
                controller: function($scope, $element){
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

                    $scope.playClick = function(){
                        if($scope.onPlayClick){
                            $scope.onPlayClick($scope.highlight);
                        }
                    };

                    $scope.titleClick = $scope.imageClick = function(){
                        if($scope.onImageClick){
                            $scope.onImageClick($scope.highlight);
                        }
                    };
                },
                link: function (scope, elem, attrs) {
                    scope.starringEnabled = 'starringEnabled' in attrs;
                    scope.playButtonOverWithImage = 'playButtonOverWithImage' in attrs;
                    scope.highlightThumbnail = AssetsManager.highlightThumbnail;

                    var img = elem.find("img");
                    img.css("min-height", img.width * 360 / 640);

//                    elem.find('.mr-video-starred i').html('')
                }
            };
        }]);
})();
