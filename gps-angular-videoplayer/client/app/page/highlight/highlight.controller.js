(function () {
    'use strict';

    angular.module('app.highlight')
        .controller('highlightCtrl', ['$rootScope', '$scope', '$stateParams', '$state', '$filter', 'logger', '$timeout', 'Highlight', 'AssetsManager', 'screenSize', 'highlightPlaylist', 'VG_UTILS', highlightCtrl]);

    function highlightCtrl($rootScope, $scope, $stateParams, $state, $filter, logger, $timeout, Highlight, AssetsManager, screenSize, highlightPlaylist, VG_UTILS) {

        $scope.playlist = highlightPlaylist.highlights;
        $scope.currentId = $stateParams.currentId || $stateParams.highlightId;
        $scope.config = {
            continuePlay: true
        };
        $scope.isMobile = screenSize.is('xs');
        $scope.userIsAuthenticated = $rootScope.isAuthenticated;

        for (var i = 0; i < $scope.playlist.length; i++) {
            var highlight = $scope.playlist[i];
            if (highlight.id == $scope.currentId) {
                $scope.highlight = highlight;
                break;
            }
        }


        // google analytics tracking
        ga('send', 'pageview', "highlight");
        ga('send', 'event', "highlight", "watch", $scope.highlight.id);

        $scope.onHighlightPlayerReady = function (API) {
            $scope.API = API;
        };

        $scope.onCanPlayHighlight = function (highlight) {
            $("#highlight_playlist").scrollTo(document.getElementById(highlight.id), 500);
        };

        $scope.onCompleteHighlight = function (highlight) {
            if ($scope.config.continuePlay) {
                $scope.nextHighlight(highlight);
                ga('send', 'event', "player", "next_auto", "HIGHLIGHT");
            }
        };

        $scope.onHighlightClick = function (highlight) {
            $scope.setHighlight(highlight);
            ga('send', 'event', "player", "change", "HIGHLIGHT");
        };

        $scope.setHighlight = function (highlight) {
            $scope.highlight = highlight;
            $state.go('highlight', {highlightId: $stateParams.highlightId, currentId: highlight.id}, {notify: false});

            ga('send', 'event', "highlight", "watch", $scope.highlight.id);

            if (VG_UTILS.isMobileDevice()) {
                // trick to autoplay on mobile
                $timeout($scope.API.play.bind($scope.API), 100);
            }
        };

        $scope.onNextClick = function () {
            $scope.nextHighlight($scope.highlight);
            ga('send', 'event', "player", "next", "HIGHLIGHT");
        };

        $scope.onPrevClick = function () {
            $scope.prevHighlight($scope.highlight);
            ga('send', 'event', "player", "prev", "HIGHLIGHT");
        };

        $scope.nextHighlight = function (highlight) {
            var index = $scope.playlist.findIndex(function (element, index, array) {
                return element.id == highlight.id;
            });

            if (index + 1 < $scope.playlist.length) {
                $scope.setHighlight($scope.playlist[index + 1]);
            } else {
                index = 0;
                $scope.setHighlight($scope.playlist[index]);
            }
        };

        $scope.prevHighlight = function (highlight) {
            var index = $scope.playlist.findIndex(function (element, index, array) {
                return element.id == highlight.id;
            });

            if (index - 1 >= 0) {
                $scope.setHighlight($scope.playlist[index - 1]);
            } else {
                index = $scope.playlist.length - 1;
                $scope.setHighlight($scope.playlist[index]);
            }
        };

        $scope.like = function () {
            Highlight.like($scope.highlight.id, function (data) {
                $scope.highlight.likes = $scope.highlight.likes + 1;
                $scope.highlight.liked = true;

                ga('send', 'event', "highlight", "like", $scope.session.id);

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

        $scope.placeMap = function (coordinates) {
            return AssetsManager.placeMap({
                latitude: coordinates[1],
                longitude: coordinates[0]
            });
        };

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
    }
})(); 