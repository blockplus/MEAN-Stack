/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrMovieTimelineEditor", ["com.mondayreplay.libs.directives.mrHighlightPlaylist", "com.mondayreplay.api.enduser.Movie"])
        .directive("mrMovieTimelineEditor", ["$rootScope", "$uibModal", "$filter", "$window", "$document", "logger", function ($rootScope, $uibModal, $filter, $window, $document, logger) {
            return {
                restrict: "E",
                templateUrl: function ($elem, $attr) {
                    return "app/libs/directives/mr-movie-timeline-editor/mr-movie-timeline-editor.html";
                },
                scope: {
                    addHighlightToTimeline: "=",
                    onMovieCreated: "="
                },
                controller: function ($scope, $element) {

                    $scope.timelineHighlights = [];

                    $scope.updateTimelineHighlightsPositions = function(){
                        for(var i=0; i<$scope.timelineHighlights.length; i++ ){
                            $scope.timelineHighlights[i].position = i+1;
                        }
                    };

                    $scope.clearTimeline = function(){
                        $scope.timelineHighlights = [];
                    };

                    $scope.addHighlightToTimeline = function(highlight){
                        var thlHighlight = angular.copy(highlight);
                        thlHighlight.position = $scope.timelineHighlights.length+1;
                        $scope.timelineHighlights.push(thlHighlight);
                    };

                    $scope.removeHighlightFromTimeline = function(highlight){
                        $scope.timelineHighlights.splice(highlight.position-1, 1);
                    };

                    $scope.onPublishClick = function(){
                        if (!$rootScope.isAuthenticated) {
                            logger.log($filter("translate")("login_to_continue"));
                            return;
                        }else if($scope.timelineHighlights.length==0){
                            logger.logWarning($filter("translate")("editmovie_select_clip_before"));
                            return;
                        }

                        // google analytics tracking
                        ga('send', 'pageview', "new_movie");

                        // build and show highlight creation modal
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/libs/directives/mr-movie-timeline-editor/mr-movie-creator-modal.html',
                            controller: 'MovieCreatorModalCtrl',
                            windowClass: "mr-movie-creator-modal",
                            resolve: {
                                timelineHighlights: function () {
                                    return $scope.timelineHighlights;
                                }
                            }
                        });

                        modalInstance.result.then(function (result) {
                            if (result == 'ok') {
                                logger.logSuccess($filter('translate')('newmovie_created'));
                                $scope.timelineHighlights = [];

                                if ($scope.onMovieCreated) {
                                    $scope.onMovieCreated();
                                }

                            } else {
                                logger.logError($filter('translate')('internal_service_error'));
                            }

                        }, function () {
                        });
                    };
                },
                link: function(scope, elem){
                    var dragDropElem = elem.find('.timeline-highlight-dragdrop-entry');
                    var timelineOverflowElem = elem.find('.timeline-highlight-list-owerflow');
                    var timelineContainerElem = elem.find('.timeline-highlight-list-container');
                    var timelineEntryMarginRight = 10;
                    scope.timelineEntryWidth = 200;

                    timelineContainerElem.width(timelineOverflowElem.width());

                    scope.sortable = {
                        options: {
                            containment: '#sortable-container',
                            allowDuplicates: true,
                            dragMove: function (itemPosition, containment, eventObj) {
                                if (eventObj) {
                                    var timelineEditorContainer = containment.find('#timeline_highlights');
                                    var targetX = eventObj.pageX;
                                    var timelineEditorContainerLeft = (timelineOverflowElem.position().left + timelineEditorContainer.position().left);
                                    if (targetX < timelineEditorContainerLeft) {
                                        timelineEditorContainer[0].scrollLeft = timelineEditorContainer[0].scrollLeft - 30;
                                    } else if (targetX > (timelineEditorContainerLeft + timelineEditorContainer.width())) {
                                        timelineEditorContainer[0].scrollLeft = timelineEditorContainer[0].scrollLeft + 30;
                                    }
                                }
                            }
                        }
                    };

                    scope.$watch(
                        function () { return scope.timelineHighlights.length; },
                        function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                timelineContainerElem.width(newValue > 0 ? (scope.timelineEntryWidth+timelineEntryMarginRight) * newValue : timelineOverflowElem.width());
                                scope.updateTimelineHighlightsPositions();
                                $('#timeline_highlights').animate({ scrollLeft: newValue > 1 ? timelineContainerElem.width() : 0 }, 500);
                            }
                        }
                    ,true);

                    scope.$watch(
                        function () { return elem.find('#timeline-info').length!== 0; },
                        function (newValue, oldValue) {
                            if (newValue !== oldValue && newValue) {
                                var timelineInfoElem = elem.find('#timeline-info');
                                timelineInfoElem.width(timelineOverflowElem.width());
                                timelineInfoElem.height(parseInt(scope.timelineEntryWidth * 360 / 640));
                            }
                        }
                    ,true);

                    // starred highlights drag&drop disabled
//                    var addToTimelinePlaceholderVisible = false;
//                    scope.$watch(
//                        function () { return elem.find('.as-sortable-placeholder').length!== 0; },
//                        function (newValue, oldValue) {
//                            if (newValue !== oldValue) {
//                                if(newValue && elem.find('.as-sortable-hidden').length == 0){
//                                    addToTimelinePlaceholderVisible = true;
//                                    elem.find('.as-sortable-placeholder').height(parseInt(scope.timelineEntryWidth * 360 / 640));
//                                    timelineContainerElem.width(((scope.timelineEntryWidth+timelineEntryMarginRight) * (scope.timelineHighlights.length + 1)) + (dragDropElem ? scope.timelineEntryWidth : 0));
//                                }else if(!newValue && addToTimelinePlaceholderVisible){
//                                    timelineContainerElem.width(((scope.timelineEntryWidth+timelineEntryMarginRight) * (scope.timelineHighlights.length)) + (dragDropElem ? scope.timelineEntryWidth : 0));
//                                }
//                            }
//                        }
//                    ,true);
                }
            };
        }])
        .controller("MovieCreatorModalCtrl", ["$scope", "$uibModalInstance", "$filter", "logger", "AssetsManager", "Digest", "Movie", "UserManager", "timelineHighlights",
            function ($scope, $uibModalInstance, $filter, logger, AssetsManager, Digest, Movie, UserManager, timelineHighlights) {

            $scope.movie = {
                highlights: timelineHighlights,
                name: '',
                description: '',
                thumbnail: AssetsManager.highlightThumbnail(timelineHighlights[0])
            };

            $scope.selectedFriends = [];
            $scope.selectedHashtags = [];
            $scope.userId = UserManager.getUserProfile().id;

            $scope.create = function (event) {
                var friendstag = $scope.selectedFriends.map(function (friend) {
                    return friend.id;
                });

                if ($scope.movie.name == '' || !$scope.movie.name) {
                    logger.logWarning($filter('translate')('name_required'));

                } else {
                    $scope.waiting = true;
                    Movie.newmovie(
                        Digest.digest(),
                        _.map($scope.movie.highlights,function(hl){ return hl.id; }),
                        $scope.movie.name,
                        $scope.musicEnabled ? ["5710c01059806f1f14213324"] : null,
                        $scope.movie.description,
                        $scope.selectedHashtags,
                        friendstag,
                        function (result) {
                            ga('send', 'event', "content", "create", "MOVIE");

                            $scope.waiting = false;
                            $uibModalInstance.close('ok');

                        }, function (result) {
                            $scope.waiting = false;
                            $uibModalInstance.close('ko');

                        });
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };
        }]);
})();
