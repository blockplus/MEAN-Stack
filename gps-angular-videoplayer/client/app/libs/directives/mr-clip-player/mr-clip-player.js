/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrClipPlayer", ["ngSanitize", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.poster", "com.2fdevs.videogular.plugins.buffering", "com.mondayreplay.libs.directives.mrInputFriends", "com.mondayreplay.libs.directives.mrInputHashtags", "com.mondayreplay.libs.Digest"])
        .directive("mrClipPlayer", ["$rootScope", '$sce', '$q', '$mdDialog', '$filter', '$timeout', '$uibModal', '$uibModal', 'AssetsManager', 'UserManager', 'Highlight', 'VG_STATES', 'VG_UTILS', 'vgFullscreen', 'logger', "Config", function ($rootScope, $sce, $q, $mdDialog, $filter, $timeout, $uibModal, $window, AssetsManager, UserManager, Highlight, VG_STATES, VG_UTILS, vgFullscreen, logger, Config) {
            return {
                restrict: 'E',
                templateUrl: "app/libs/directives/mr-clip-player/mr-clip-player.html",
                scope: {
                    clip: "=",
                    editMode: '=?',
                    onClipPlayerReady: "=",
                    onCompleteClip: "=",
                    onUpdateTime: "=",
                    onPrevClick: "=",
                    onNextClick: "=",
                    onHighlightCreated: "=",
                    isFloating: "="
                },
                controller: function ($scope, $element) {

                    /**
                     * Some of Variables
                      *
                     */
                    var screenLgWidth = 1200; // in pixels

                    $scope.appConfig = Config;

                    /**
                     * In sm/xs sizes player width is 100%
                     *
                     */
                    var rangeSizes = {
                        lg: {
                            windowWidth: 1200,
                            small:  21,
                            medium: 45,
                            large:  90
                        },
                        md: {
                            windowWidth: 992,
                            small:  18,
                            medium: 38,
                            large:  75
                        },
                        sm: {
                            windowWidth: 768,
                            small:  18,
                            medium: 38,
                            large:  75
                        },
                        xs: {
                            windowWidth: 480,
                            small:  21,
                            medium: 45,
                            large:  90
                        },
                        other: {
                            small:  14,
                            medium: 32,
                            large:  65
                        }
                    }

                    /**
                     * If video length is more than this value zoomed timeline bar will be displayed
                     * around range selector with 140secs
                     */
                    var zoomDuration = 140;

                    $scope.zoomDuration = zoomDuration;

                    $scope.highlight = {
                        thumbnail: false,
                        playbackRate: 1
                    };
                    $scope.videoElement = {};
                    $scope.selectrange = {
                      view: false,
                      width: 0, /*percentuale*/
                      selected: false,
                      isFixedWidth: false
                    };



                    $scope.onCompleteVideo = function () {
                        if ($scope.onCompleteClip) {
                            $scope.onCompleteClip($scope.clip);
                        }
                    };

                    $scope.onPlayerReady = function (API) {
                        $scope.API = API;
                        $scope.videoElement = $scope.API.mediaElement[0];
                        if ($scope.onClipPlayerReady) {
                            $scope.onClipPlayerReady(API);
                        }

                    };

                    $scope.$watch('API.isFullScreen', function (isFullscreen) {
                        $scope.isFullscreen = $scope.API.isFullScreen === true;
                    }, true);

                    $scope.$watch('clip', function (clip) {
                        $scope.API.clearMedia();

                        $scope.config.sources = [
                            {src: $sce.trustAsResourceUrl(AssetsManager.clipVideo($scope.clip)), type: "video/mp4"}
                        ];
                        $scope.config.plugins.poster = AssetsManager.clipThumbnail($scope.clip);

                        $timeout(function () {
                            $scope.setPlaybackRate(1);
                        }, 0);
                        $scope.hideRangeSelector();
                        loadHighlight();

                    }, true);

                    $scope.$watch('selectrange.left', function (left) {
                        if ($scope.selectrange.selected) {
                            /**
                             * Update startLoop, endLoop according to zoomTimelineBar is shown
                             *
                             */
                            if ($scope.videoElement.duration > $scope.zoomDuration) {
                                $scope.selectrange.startLoop = $scope.zoomStart + ($scope.selectrange.left * $scope.zoomDuration) / $scope.progressBarWidth;
                            }
                            else {
                                $scope.selectrange.startLoop = ($scope.selectrange.left * $scope.videoElement.duration) / $scope.progressBarWidth;
                            }

                            $scope.selectrange.endLoop = $scope.selectrange.startLoop + $scope.selectrange.duration * $scope.highlight.playbackRate;

                        }
                    }, true);

                    $scope.updateLoopRange = function() {
                        /**
                         * Update startLoop, endLoop according to zoomTimelineBar is shown
                         *
                         */
                        if ($scope.videoElement.duration > $scope.zoomDuration) {
                            $scope.selectrange.startLoop = $scope.zoomStart + ($scope.selectrange.left * $scope.zoomDuration) / $scope.progressBarWidth;
                        }
                        else {
                            $scope.selectrange.startLoop = ($scope.selectrange.left * $scope.videoElement.duration) / $scope.progressBarWidth;
                        }

                        $scope.selectrange.endLoop = $scope.selectrange.startLoop + $scope.selectrange.duration * $scope.highlight.playbackRate;
                    };

                    $scope.onPlayerUpdateTime = function(currentTime, duration) {
                        if($scope.selectrange.view && currentTime >= $scope.selectrange.endLoop && $scope.selectrange.endLoop > 0){
                            $scope.videoElement.currentTime = $scope.selectrange.startLoop;
                        }

                        $scope.onUpdateTime($scope.videoElement.currentTime, duration);
                    };

                    $scope.setPlaybackRate = function (rate) {
                        $scope.API.setPlayback(rate);
                        $scope.highlight.playbackRate = $scope.API.playback;

                        if ($scope.selectrange.selected) {
                            $scope.selectrange.endLoop = $scope.selectrange.startLoop + $scope.selectrange.duration * $scope.highlight.playbackRate;
                            $scope.selectrange.width = Math.round(($scope.selectrange.duration * $scope.highlight.playbackRate / $scope.videoElement.duration) * 100 * 100) / 100;
                            var progress = Math.max(0, ( ($scope.videoElement.currentTime - $scope.selectrange.duration / 2) / $scope.videoElement.duration) * 100);

                            var selectRangeWidthPercentage = $scope.selectrange.width / $scope.progressBarWidth * 100;

                            if (progress + selectRangeWidthPercentage > 100) {
                                $scope.selectrange.left = ((100 - selectRangeWidthPercentage) / 100) * $scope.progressBarWidth;
                            } else {
                                $scope.selectrange.left = (progress) / 100 * $scope.progressBarWidth;
                            }
                        }
                    };

                    $scope.hideRangeSelector = function () {
                        $scope.selectrange.view = false;
                        $scope.selectrange.width = 0;
                        $scope.selectrange.color = false;
                        $scope.selectrange.length = false;
                        $scope.selectrange.selected = false;
                        $scope.selectrange.duration = 0;
                        $scope.selectrange.startLoop = 0;
                        $scope.selectrange.endLoop = 0;
                    };

                    $scope.createRangeSelector = function (length) {
                        var lengthMap = {
                            small: 7,
                            medium: 15,
                            large: 30
                        };
                        var fixedSelectRangeWidth = {
                          small: 21,
                          medium: 45,
                          large: 90
                        };

                        if ($scope.selectedHighlight) {
                            $scope.selectedHighlight.selected = false;
                            $scope.selectedHighlight = false;
                        }
                        if ($scope.selectrange.length == length) {
                            $scope.hideRangeSelector();
                            return;
                        }



                        $scope.selectrange.length = length;
                        $scope.selectrange.duration = Math.min(lengthMap[length], $scope.videoElement.duration);

                        /** calculate selecrange bar width as percentage of progress bar width
                         *
                        */


                        /**
                         * Calculate zoomStart and zoomEnd Play Position Bar
                         */
                        if ($scope.videoElement.duration > zoomDuration) {

                            //$scope.selectrange.width = Math.round(($scope.selectrange.duration * $scope.highlight.playbackRate / $scope.videoElement.duration) * 100 * 100) / 100;
                            if (window.innerWidth >= rangeSizes.lg.windowWidth) {
                                $scope.selectrange.width = rangeSizes.lg[length];
                            }
                            else if (window.innerWidth >= rangeSizes.md.windowWidth) {
                                $scope.selectrange.width = rangeSizes.md[length];
                            }
                            else if (window.innerWidth >= rangeSizes.sm.windowWidth) {
                                $scope.selectrange.width = rangeSizes.sm[length];
                            }
                            else if (window.innerWidth >= rangeSizes.xs.windowWidth) {
                                $scope.selectrange.width = rangeSizes.xs[length];
                            }
                            else {
                                $scope.selectrange.width = rangeSizes.other[length];
                                //$scope.selectrange.width = Math.round(($scope.selectrange.duration * $scope.highlight.playbackRate / $scope.videoElement.duration) * 100 * 100) / 100;
                            }

                            var selectRangeWidthPercentage = $scope.selectrange.width / $scope.progressBarWidth * 100;

                            $scope.selectrange.isFixedWidth = true; // show zoomed time line and rangebar is fixed width

                            if ($scope.videoElement.currentTime <=  zoomDuration / 2) {
                                // bar is close to left (begin) position
                                $scope.zoomStart = 0;
                                $scope.zoomEnd = zoomDuration;
                            }
                            else if ($scope.videoElement.currentTime >=  $scope.videoElement.duration - zoomDuration / 2) {
                                // bar is close to right (end) position
                                $scope.zoomStart = $scope.videoElement.duration - zoomDuration;
                                $scope.zoomEnd = $scope.videoElement.duration;
                            }
                            else {
                                $scope.zoomStart = $scope.videoElement.currentTime - zoomDuration / 2;
                                $scope.zoomEnd = $scope.videoElement.currentTime + zoomDuration / 2;
                            }

                            /**
                             * selectrange position will not be current position
                             * it will be repositioned because of zooming
                             */

                            var progress = Math.max(0, ( ($scope.videoElement.currentTime - $scope.zoomStart - $scope.selectrange.duration / 2) / zoomDuration) * 100);
                            if (progress + selectRangeWidthPercentage > 100) {
                                $scope.selectrange.left = ((100 - selectRangeWidthPercentage) / 100) * $scope.progressBarWidth;
                            } else {
                                $scope.selectrange.left = (progress) / 100 * $scope.progressBarWidth;
                            }

                        }
                        else {
                            $scope.selectrange.isFixedWidth = false; // range bar is dynamic
                            // this value is in percentage
                            $scope.selectrange.width = Math.round(($scope.selectrange.duration * $scope.highlight.playbackRate / $scope.videoElement.duration) * 100 * 100) / 100;
                            var selectRangeWidthPercentage = $scope.selectrange.width;

                            var progress = Math.max(0, ( ($scope.videoElement.currentTime - $scope.selectrange.duration / 2) / $scope.videoElement.duration) * 100);
                            if (progress + selectRangeWidthPercentage > 100) {
                                $scope.selectrange.left = ((100 - selectRangeWidthPercentage) / 100) * $scope.progressBarWidth;
                            } else {
                                $scope.selectrange.left = (progress) / 100 * $scope.progressBarWidth;
                            }
                        }

                        $scope.updateLoopRange();
                        $scope.selectrange.view = true;
                        $scope.selectrange.selected = true;

                    };

                    $scope.selectHighlight = function (selected) {
                        $scope.hideRangeSelector();
                        if ($scope.selectedHighlight) {
                            if ($scope.selectedHighlight.id == selected.id) {
                                $scope.selectedHighlight = false;
                                return;
                            }
                        }
                        $scope.selectedHighlight = selected;
                        $scope.videoElement.currentTime = selected.starttime / 1000;
                    };

                    $scope.createHighlight = function ($event) {
                        if (!$rootScope.isAuthenticated) {
                            logger.log($filter("translate")("login_to_continue"));
                            return;
                        }

                        var startTime = getHighlightStartTime();
                        if (startTime < 0) {
                            logger.logWarning($filter('translate')('highlight_duration_required'));
                            return;
                        }

                        $scope.API.pause();

                        // google analytics tracking
                        ga('send', 'pageview', "new_highlight");

                        // build and show highlight creation modal
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/libs/directives/mr-clip-player/mr-highlight-creator-modal.html',
                            controller: 'HighlightCreatorModalCtrl',
                            windowClass: "mr-highlight-creator-modal",
                            resolve: {
                                clip: function () {
                                    return $scope.clip;
                                },
                                highlight: function () {
                                    return angular.extend($scope.highlight, {
                                        clipId: $scope.clip.id,
                                        startTime: startTime,
                                        duration: $scope.selectrange.duration
                                    });
                                }
                            }
                        });

                        modalInstance.result.then(function (result) {
                            if (result == 'ok') {
                                logger.logSuccess($filter('translate')('newhighlight_created'));
                                $scope.hideRangeSelector();
                                loadHighlight();

                                if ($scope.onHighlightCreated) {
                                    $scope.onHighlightCreated();
                                }

                            } else {
                                logger.logError($filter('translate')('internal_service_error'));
                            }
                            $scope.API.play();

                        }, function () {
                            $scope.API.play();
                        });
                    };

                    /**
                     * Update the thumbnail position and image
                     * @param event
                     */
                    $scope.onBarMouseMove = function(event) {
                        $scope.previewPos = parseInt(event.offsetX / $scope.progressBarWidth * $scope.videoElement.duration);
                        if ($scope.previewPos > 0) {

                            // calcualte filename
                            $scope.thumb.filename = '' + $scope.previewPos;

                            while ($scope.thumb.filename.length < 5) {
                                $scope.thumb.filename = '0'+ $scope.thumb.filename;
                            }

                            // calcualte left position
                            $scope.thumb.left = $scope.thumb.minLeft + event.offsetX / $scope.progressBarWidth * $scope.thumb.range;

                        }
                        else {
                            $scope.thumb.visible = false;
                        }

                    };

                    //hide thumbnail
                    $scope.onBarMouseLeave = function(event) {
                        $scope.thumb.visible = false;
                    };

                    //show thumbnail
                    $scope.onBarMouseEnter = function(event) {
                        $scope.thumb.visible = true;
                    };

                    var getHighlightStartTime = function () {
                        var totalWidth = $scope.progressBarWidth;
                        if ($scope.selectrange.selected &&  $scope.videoElement.duration < zoomDuration) {
                            var start = $scope.selectrange.left;
                            return (start * $scope.videoElement.duration) / totalWidth;
                        }
                        else if ($scope.selectrange.selected && $scope.videoElement.duration > zoomDuration) {
                            var start = $scope.selectrange.left;
                            return $scope.zoomStart + (start * $scope.zoomDuration) / totalWidth;
                        }
                        if ($scope.selectedHighlight) {
                            //return $scope.selectedHighlight.starttime / 1000;
                        }
                        return -1;
                    };

                    var loadHighlight = function () {
                        Highlight.highlightsByClipId($scope.clip.id, 0, 0, function (highlights) {
                            $scope.highlights = highlights.highlights;

                        }, function (data, status) {

                        });
                    }

                },
                link: function (scope, elem, attrs) {
                    scope.config = {
                        preload: "none",
                        autoHide: false,
                        autoHideTime: 1000,
                        autoPlay: !VG_UTILS.isMobileDevice(),
                        //theme: "bower_components/videogular-themes-default/videogular.min.css",
                        plugins: {}
                    };

                    scope.hasVgControls = elem.find('vg-controls').length > 0;

                    scope.getProgressBarDimensions = function () {
                        var progressBar = elem.find('vg-scrub-bar');
                        return {'h': progressBar.height(), 'w': progressBar.width()};
                    };

                    scope.$watch(scope.getProgressBarDimensions, function (newValue, oldValue) {
                        if (newValue) {

                            scope.progressBarWidth = newValue.w;


                            /**
                             * Calculate Timeline bar offset
                             */

                            var timelineBar = document.getElementsByTagName('vg-scrub-bar')[0];
                            var barOffset = timelineBar.offsetLeft;

                            // 40: left,right additional space
                            // 80: thumb width

                            scope.thumb = {
                                left: barOffset - 40,
                                minLeft: barOffset - 40,
                                maxRight: scope.progressBarWidth + barOffset + 40 - 80,
                                time: 0,
                                visible: false,
                                barOffset: barOffset,
                                filename: '00001',
                                width: 80
                            };

                            scope.thumb.range = scope.thumb.maxRight - scope.thumb.minLeft;


                        }
                    }, true);

                    scope.getHighlightEditorDimensions = function () {
                        var highlightEditor = elem.find('.highlight-editor');
                        return {'h': highlightEditor.height(), 'w': highlightEditor.width()};
                    };

                    scope.$watch(scope.getHighlightEditorDimensions, function (newValue, oldValue) {
                        if (newValue) {
                            var highlightEditor = elem.find('.highlight-editor');
                            var videoangularContainer = elem.find('.videoangular-container');
                            videoangularContainer.height(parseInt(videoangularContainer.width() * 360 / 640) + (newValue.h || 0));
                            $(highlightEditor).parent().css("padding-bottom", (newValue.h || 0));
                            var overlayPlayElem = $(highlightEditor).siblings('vg-overlay-play');
                            if (overlayPlayElem) {
                                overlayPlayElem.find('.overlayPlayContainer').css("padding-bottom", (newValue.h || 0));
                            }
                            var bufferingElem = $(highlightEditor).siblings('vg-buffering');
                            if (bufferingElem) {
                                bufferingElem.css("padding-bottom", (newValue.h || 0));
                            }
                            var controlsElem = $(highlightEditor).siblings('vg-controls');
                            if (controlsElem) {
                                controlsElem.css("bottom", (newValue.h || 0));
                            }
                        }
                    }, true);

//                    var videoangularContainer = elem.find('.videoangular-container');
//                    videoangularContainer.height(parseInt(videoangularContainer.width() * 360 / 640));
                }
            };
        }])
        .directive("mrHighlightRangeSelector", ['$document', '$timeout', function ($document, $timeout) {
            return {
                require: '^mrClipPlayer',
                link: function (scope, elem, attr, mrClipPlayerController) {
                    var startX = 0, startY = 0, x = 0, y = 0;
                    var css_left = 0;
                    var bar_width = 0;
                    var selector_width = 0;
                    scope.selectrange.bar_width = elem.offsetParent.offsetWidth;
                    elem.on('mousedown', function (event) {
                        event.preventDefault();
                        startX = event.pageX - x;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);

                        css_left = elem.css('left');
                        bar_width = event.target.offsetParent.offsetWidth;
                        selector_width = event.target.offsetWidth;
                    });
                    function mousemove(event) {
                        x = event.pageX - startX;
                        elem.css({
                            left: Math.min(Math.max(0, (parseFloat(css_left) + x)), bar_width - selector_width) + 'px'
                        });
                        $timeout(function () {
                            //bar:duration=css:x -> x = duration*css/bar

                            /**
                             * calculate currentTime differently if timeline is zoomed: should be in rage
                             * zoomStart, zoomed
                             */
                            var _currentTime = 0;
                            if (scope.videoElement.duration > scope.zoomDuration) {
                                _currentTime = scope.zoomStart + (parseFloat(elem.css('left')) / bar_width) * scope.zoomDuration;
                            }
                            else {
                                _currentTime = (parseFloat(elem.css('left')) / bar_width) * scope.videoElement.duration;
                            }

                            //selector_width:x=bar_width:duration -> x = (duration*selector_width)/bar_width
                            if (isFinite(_currentTime)) {
                                scope.videoElement.currentTime = _currentTime;
                            }
                        }, 0);
                        scope.selectrange.left = parseFloat(elem.css('left'));
                    }

                    function mouseup() {
                        $document.off('mousemove', mousemove);
                        $document.off('mouseup', mouseup);
                        css_left = 0;
                        x = 0;
                        bar_width = 0;
                        selector_width = 0;
                    }
                }
            }
        }])
        .directive("mrClipHighlights", ['$timeout', function ($timeout) {
            return {
                require: '^mrClipPlayer',
                templateUrl: "app/libs/directives/mr-clip-player/mr-clip-highlights.html",
                scope: {
                    highlights: '=',
                    clipDuration: '=',
                    onClickHighlight: '&'
                },
                link: function (scope, element, attr, mrVideoClipController) {
                    element.addClass('mr-clip-highlights');
                    scope.getWidthPercentage = function (h) {
                        return ((h.duration / 1000) / scope.clipDuration) * 100;
                    };
                    scope.getLeftPercentage = function (h) {
                        return ((h.starttime / 1000) / scope.clipDuration) * 100;
                    };
                    scope.getTitleStyle = function (h) {
                        if (((h.starttime / 1000) / scope.clipDuration) * 100 < 50) {
                            return {
                                //'margin-left': '24px',
                                'left': ( ((h.starttime / 1000) / scope.clipDuration) * 100 ) + '%'
                            }
                        } else {
                            return {
                                'margin-right': '-20px',
                                'right': ((1 - ((h.starttime / 1000) / scope.clipDuration)) * 100 ) + '%'
                            }
                        }

                    };
                    scope.getClass = function (h) {
                        var durationClassMap = {
                            7: 'yellow',
                            15: 'blue',
                            30: 'red'
                        };
                        durationClassMap[scope.clipDuration] = 'green';
                        return durationClassMap[h.duration / 1000] + (h.selected ? ' selected' : '');
                    };
                    scope.onClick = function (h) {
                        scope.highlights.forEach(function (item) {
                            if (item.id != h.id) {
                                item.selected = false;
                            } else {
                                item.selected = !item.selected;
                            }
                        });
                        scope.onClickHighlight({selected: h})
                    };
                }
            }
        }])
        .controller("HighlightCreatorModalCtrl", ["$scope", "$uibModalInstance", "$filter", "logger", "AssetsManager", "Digest", "Highlight", "UserManager", "clip", "highlight", function ($scope, $uibModalInstance, $filter, logger, AssetsManager, Digest, Highlight, UserManager, clip, highlight) {

            $scope.hl = angular.extend(highlight, {
                name: '',
                thumbnail: AssetsManager.clipFrame(clip, Math.round(highlight.startTime * 1000 + (highlight.duration * 1000) / 2))
            });

            $scope.selectedFriends = [];
            $scope.selectedHashtags = [];
            $scope.userId = UserManager.getUserProfile().id;

            $scope.create = function (event) {
                var friendstag = $scope.selectedFriends.map(function (friend) {
                    return friend.id;
                });

                if ($scope.hl.name == '' || !$scope.hl.name) {
                    logger.logWarning($filter('translate')('name_required'));

                } else {
                    $scope.waiting = true;
                    Highlight.newhighlight(
                        Digest.digest(),
                        $scope.hl.clipId,
                        Math.round($scope.hl.startTime * 1000),
                        $scope.hl.duration * 1000,
                        $scope.hl.playbackRate,
                        $scope.hl.name,
                        undefined, // TODO add description
                        $scope.selectedHashtags,
                        friendstag,
                        undefined,
                        function (result) {
                            ga('send', 'event', "session", "new_highlight", clip.sessionId);
                            ga('send', 'event', "content", "create", "HIGHLIGHT");

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
