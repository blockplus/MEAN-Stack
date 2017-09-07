(function () {
    "use strict";

    angular.module("app.session")
        .controller("sessionCtrl", ["$scope", "$rootScope", "$stateParams", "$state", "$timeout", "$http", "$filter", "$mdDialog", "logger", "utils", "screenSize", "AssetsManager", "VG_UTILS", "Session", "Highlight", "Track", "session", "clipPlaylist", sessionCtrl]);

    function sessionCtrl($scope, $rootScope, $stateParams, $state, $timeout, $http, $filter, $mdDialog, logger, utils, screenSize, AssetsManager, VG_UTILS, Session, Highlight, Track, session, clipPlaylist) {

        $scope.clipPlaylist = clipPlaylist.clips;
        $scope.clipId = $stateParams.clipId;
        $scope.currentClipIndex = null;
        $scope.session = session.session;
        $scope.gpsInfo = $scope.session.tracks > 0;
        $scope.iamOwner = $rootScope.userProfile && $scope.session.ownerId == $rootScope.userProfile.id;
        $scope.isMobile = screenSize.is("xs");
        $scope.mapStatus = {};

        // google analytics tracking
        ga('send', 'pageview', "session");
        ga('send', 'event', "session", "watch", $scope.session.id);

        if ($scope.session.clipsTrackOffset != undefined) {
            $scope.synch = {
                lock: true
            }
        } else {
            $scope.synch = {
                lock: false
            }
        }

        $scope.highlightPlaylist = {
            data: [],
            busy: false,
            disabled: false,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.highlightPlaylist.busy) return;
                utils.toggleInfiniteScrolling($scope.highlightPlaylist);

                Highlight.highlightsBySessionId($scope.session.id, $scope.highlightPlaylist.start, $scope.highlightPlaylist.limit,
                    function (data) {
                        for (var i = 0; i < data.highlights.length; i++) {
                            $scope.highlightPlaylist.data.push(data.highlights[i]);
                        }
                        $scope.highlightPlaylist.start = $scope.highlightPlaylist.data.length;
                        utils.toggleInfiniteScrolling($scope.highlightPlaylist, data.highlights);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.highlightPlaylist);
                    }
                );
                
            },
            goToHighlightPage: function(highlight){
                $state.go("highlight",{highlightId: highlight.id });
            }
        };
        $scope.highlightPlaylist.nextPage();

        if ($scope.session.tracks > 0) {
            Track.tracksBySessionId($scope.session.id, 0, 1, function (data) {
                if (data.tracks.length > 0) {
                    var track = data.tracks[0];
                    if (track.formats.geojsonCP) {
                        $http.get(AssetsManager.trackGeojsonCP(track)).success(function (geojson) {
                            $scope.track = geojson;

                            var coordinateProperties = geojson.features[0].properties && geojson.features[0].properties.coordinateProperties;
                            var coordinate = geojson.features[0].geometry.coordinates[0]; // the track always has a geometry

                            var times = coordinateProperties && coordinateProperties.times && coordinateProperties.times[0].map(function (currentValue) {
                                    return Date.parse(currentValue);
                                });
                            var speed = coordinateProperties && coordinateProperties.speed && coordinateProperties.speed[0].map(function (currentValue) {
                                    return parseFloat(currentValue);
                                });
                            var distance = coordinateProperties && coordinateProperties.distance && coordinateProperties.distance[0].map(function (currentValue) {
                                    return parseFloat(currentValue);
                                });

                            var hasElevation = false;
                            var elevation = coordinate.map(function (currentValue) {
                                if (currentValue[2] && currentValue[2] > 0) {
                                    hasElevation = true;
                                }
                                return currentValue[2];
                            });
                            if (!hasElevation) {
                                elevation = undefined;
                            }

                            $scope.trackProperties = {
                                points: coordinate,
                                times: times,
                                speed: speed,
                                distance: distance,
                                elevation: elevation
                            };

                            $scope.gpsInfo = true;
                            $scope.gpsExtraInfo = $scope.trackProperties.elevation || $scope.trackProperties.speed;
                        });
                    }
                }
            }, function (data, status) {
                // TODO gestione errori
            });
        }

        for (var i = 0; i < $scope.clipPlaylist.length; i++) {
            var clip = $scope.clipPlaylist[i];
            if ($scope.clipId == null) {
                $scope.clipId = clip.id;
            }
            if (clip.id == $scope.clipId) {
                $scope.clip = clip;
                $scope.currentClipIndex = i;
                $scope.currentClipPosition = 0;
                break;
            }
        }

        var synchSession = function (index) {
            if ($scope.iamOwner && !$scope.synch.lock) {
                $scope.API.pause();

                var confirm = $mdDialog.confirm()
                    .title($filter("translate")("session_sync_track_gps_dialog_title"))
                    .content($filter("translate")("session_sync_track_gps_dialog_content"))
                    .ok($filter("translate")("session_sync_track_gps_dialog_confirm"))
                    .cancel($filter("translate")("session_sync_track_gps_dialog_cancel"));

                $mdDialog.show(confirm).then(function () {
                    var clickTime = $scope.trackProperties.times[index];
                    var clipStartTime = $scope.clip.timetaken;
                    var clipCurrentTime = Math.floor($scope.API.currentTime);
                    var newClipsTrackOffset = clickTime - (clipStartTime + clipCurrentTime);

                    Session.update($scope.session.id, undefined, undefined, undefined, newClipsTrackOffset, undefined, undefined, undefined, function (data) {

                        // local update session
                        $scope.session.clipsTrackOffset = newClipsTrackOffset;
                        var session = {};
                        angular.copy($scope.session, session);
                        $scope.session = session;
                        if ($scope.session.clipsTrackOffset != undefined) {
                            $scope.synch = {
                                lock: true
                            }
                        } else {
                            $scope.synch = {
                                lock: false
                            }
                        }

                    }, function (data, status) {

                    });


                }, function () {
                    // nothing to do
                });
            }
        };

        $scope.onClipPlayerReady = function (API) {
            $scope.API = API;
        };

        $scope.scrollToSessionHighlight = function () {
            $.scrollTo(document.getElementById("session_highlights"), 500);
        };

        $scope.onCompleteClip = function (clip) {
            $scope.nextClip(clip);
            ga('send', 'event', "player", "next_auto", "SESSION_CLIP");
        };

        $scope.onUpdateTime = function (currentTime, duration) {
            $scope.currentClipPosition = Math.floor(currentTime * 1000);
        };

        $scope.setClip = function (index) {
            $scope.currentClipIndex = index;
            $scope.currentClipPosition = 0;
            $scope.clip = $scope.clipPlaylist[index];
            $("#session_clips").scrollTo(document.getElementById($scope.clip.id), 500);
            $state.go("session", {sessionId: $stateParams.sessionId, clipId: $scope.clip.id}, {notify: false});

            if (VG_UTILS.isMobileDevice()) {
                // trick to autoplay on mobile
                $timeout($scope.API.play.bind($scope.API), 100);
            }
        };

        $scope.onNextClick = function () {
            $scope.nextClip($scope.clip);
            ga('send', 'event', "player", "next", "SESSION_CLIP");
        };

        $scope.onPrevClick = function () {
            $scope.prevClip($scope.clip);
            ga('send', 'event', "player", "prev", "SESSION_CLIP");
        };

        $scope.nextClip = function (clip) {
            var index = $scope.clipPlaylist.findIndex(function (element, index, array) {
                return element.id == clip.id;
            });

            if (index + 1 < $scope.clipPlaylist.length) {
                $scope.setClip(index + 1);
            }
        };

        $scope.prevClip = function (clip) {
            var index = $scope.clipPlaylist.findIndex(function (element, index, array) {
                return element.id == clip.id;
            });

            if (index - 1 > -1) {
                $scope.setClip(index - 1);
            }
        };

        $scope.onHighlightCreated = function () {
            $scope.highlightPlaylist.data = [];
            $scope.highlightPlaylist.busy = false;
            $scope.highlightPlaylist.disabled = false;
            $scope.highlightPlaylist.start = 0;
            $scope.highlightPlaylist.limit = 30;
            $scope.highlightPlaylist.nextPage();
        };

        $scope.like = function () {
            Session.like($scope.session.id, function (data) {
                $scope.session.likes = $scope.session.likes + 1;
                $scope.session.liked = true;

                ga('send', 'event', "session", "like", $scope.session.id);

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

        $scope.onGpsLockChange = function () {
            if ($scope.synch.lock && !$scope.session.clipsTrackOffset) {
                // session.clipsTrackOffset non è ancora definito, loccato setto questo valore a zero.
                Session.update($scope.session.id, undefined, undefined, undefined, 0, undefined, undefined, undefined, function (data) {
                }, function (data, status) {
                });
            }
        };

        $scope.onTrackClickMap = function (point) {
            synchSession(point[0]);
        };

        $scope.onTrackOverMap = function (point) {
            $scope.selectedTrackPointIndexMap = point[0];
        };

        $scope.onTrackOutMap = function () {
            $scope.selectedTrackPointIndexMap = null;
        };

        $scope.onTrackClickChart = function (index) {
            synchSession(index);
        };

        $scope.onTrackOverChart = function (index) {
            $scope.selectedTrackPointIndexChart = index;
        };

        $scope.onTrackOutChart = function () {
            $scope.selectedTrackPointIndexChart = null;
        };

        // callback clip-preview on click clip
        $scope.sessionClipClick = function (clip) {
            var index = $scope.clipPlaylist.findIndex(function (element) {
                return element.id == clip.id;
            });

            $scope.setClip(index);

            ga('send', 'event', "player", "change", "SESSION_CLIP");
        };

        // callback clip-preview on delete clip
        $scope.onDeleteClip = function (clip, position) {
            $scope.clipPlaylist.splice(position, 1);

            if ($scope.clipPlaylist.length == 0) {
                // elimino anche la sessione vuota e torno a myprofile
                Session.delete($scope.session.id, function () {
                }, function (data, status) {
                    // TODO gestione errori
                });

                $state.go("homepage");

            } else {
                if ($scope.currentClipIndex == position) {
                    $scope.setClip(($scope.currentClipIndex + 1) % $scope.clipPlaylist.length);
                }
            }
        };
    }
})();