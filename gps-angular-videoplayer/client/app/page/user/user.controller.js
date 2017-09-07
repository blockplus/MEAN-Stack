(function () {
    "use strict";

    angular.module("app.user")
        .controller("userCtrl", ["$scope", "$filter", "$sce", "$state", "$stateParams", "logger", "digestlog", "utils", "Timeline", "Friend", "Session", "Checkin", "Highlight", "Movie", "UserManager", "userSelected", userCtrl]);

    function userCtrl($scope, $filter, $sce, $state, $stateParams, logger, digestlog, utils, Timeline, Friend, Session, Checkin, Highlight, Movie, UserManager, userSelected) {
        $scope.user = userSelected.profile;

        digestlog.watchDigest($scope);

        switch ($stateParams.subsection) {
            case 'activities':
                $scope.tabSelectedIndex = 0;
                break;
            case 'sessions':
                $scope.tabSelectedIndex = 1;
                break;
            case 'movies':
                $scope.tabSelectedIndex = 2;
                break;
            case 'highlights':
                $scope.tabSelectedIndex = 3;
                break;
            case 'checkins':
                $scope.tabSelectedIndex = 4;
                break;
            case 'friends':
                $scope.tabSelectedIndex = 5;
                break;
            default:
                $state.go('user_subsection', {userId: $scope.user.id, subsection: 'activities'}, {notify: false});
                $scope.tabSelectedIndex = 0;
        }

        $scope.showAddFriend = false;
        $scope.showPendingAccept = false;

        $scope.checkFriendship = function () {
            if (UserManager.isAuthenticated() && $scope.user.id != UserManager.getUserProfile().id) {
                Friend.status($scope.user.id, function (data) {
                    if (data.status == "NOT_FRIEND") {
                        $scope.showAddFriend = true;

                    } else if (data.status == "PENDING_ACCEPT") {
                        $scope.showPendingAccept = true;

                    } else {
                        $scope.showAddFriend = false;
                        $scope.showPendingAccept = false;
                    }

                }, function (data, status) {

                });
            }
        };
        $scope.checkFriendship();

        $scope.requestFriendship = function () {
            Friend.requestFriendship($scope.user.id, function (data) {
                $scope.checkFriendship();

            }, function (data, status) {

            });
        };

        $scope.acceptFriendship = function() {
            Friend.acceptFriendship($scope.user.id, function (data) {
                $scope.checkFriendship();

            }, function (data, status) {

            });
        };

        // google analytics tracking
        $scope.$watch("tabSelectedIndex", function (current) {
            switch (current) {
                case 0:
                    ga("send", "pageview", "profile_activities");
                    $state.go('user_subsection', {userId: $scope.user.id, subsection: 'activities'}, {notify: false});
                    break;
                case 1:
                    ga("send", "pageview", "profile_sessions");
                    $state.go('user_subsection', {userId: $scope.user.id, subsection: 'sessions'}, {notify: false});
                    break;
                case 2:
                    ga("send", "pageview", "profile_movies");
                    $state.go('user_subsection', {userId: $scope.user.id, subsection: 'movies'}, {notify: false});
                    break;
                case 3:
                    ga("send", "pageview", "profile_highlights");
                    $state.go('user_subsection', {userId: $scope.user.id, subsection: 'highlights'}, {notify: false});
                    break;
                case 4:
                    ga("send", "pageview", "profile_checkins");
                    $state.go('user_subsection', {userId: $scope.user.id, subsection: 'checkins'}, {notify: false});
                    break;
                case 5:
                    ga("send", "pageview", "profile_friends");
                    $state.go('user_subsection', {userId: $scope.user.id, subsection: 'friends'}, {notify: false});
                    break;
            }

            $scope.timeline.disabled = current != 0;
            $scope.sessions.disabled = current != 1;
            $scope.movies.disabled = current != 2;
            $scope.highlights.disabled = current != 3;
            $scope.checkins.disabled = current != 4;
            $scope.friends.disabled = current != 5;
        });


        $scope.TimelineEntryTypes = {};
        $scope.TimelineEntryTypes._SESSION = "SESSION";
        $scope.TimelineEntryTypes._HIGHLIGHT = "HIGHLIGHT";
        $scope.TimelineEntryTypes._MOVIE = "MOVIE";
        $scope.TimelineEntryTypes._USER = "USER";
        $scope.TimelineEntryTypes._CHECKIN = "CHECKIN";
        $scope.TimelineEntryTypes._CONTENT_DELETED = "CONTENT_DELETED";

        $scope.TimelineActionTypes = {};
        $scope.TimelineActionTypes._NewHighlightEvent = "NewHighlightEvent";
        $scope.TimelineActionTypes._LikeHighlightEvent = "LikeHighlightEvent";
        $scope.TimelineActionTypes._NewHighlightCommentEvent = "NewHighlightCommentEvent";
        $scope.TimelineActionTypes._NewMovieEvent = "NewMovieEvent";
        $scope.TimelineActionTypes._LikeMovieEvent = "LikeMovieEvent";
        $scope.TimelineActionTypes._NewMovieCommentEvent = "NewMovieCommentEvent";
        $scope.TimelineActionTypes._NewCheckinEvent = "NewCheckinEvent";
        $scope.TimelineActionTypes._LikeCheckinEvent = "LikeCheckinEvent";
        $scope.TimelineActionTypes._NewCheckinCommentEvent = "NewCheckinCommentEvent";
        $scope.TimelineActionTypes._NewClipAvailableEvent = "NewClipAvailableEvent";
        $scope.TimelineActionTypes._LikeSessionEvent = "LikeSessionEvent";
        $scope.TimelineActionTypes._NewSessionCommentEvent = "NewSessionCommentEvent";
        $scope.TimelineActionTypes._NewUserEvent = "NewUserEvent";

        $scope.timeline = {
            data: [],
            daysEvaluated: {},
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.timeline.busy) return;
                utils.toggleInfiniteScrolling($scope.timeline);

                Timeline.actionsByUserId($scope.user.id, $scope.timeline.start, $scope.timeline.limit,
                    function (data) {
                        for (var i = 0; i < data.actions.length; i++) {
                            $scope.timeline.data.push(data.actions[i]);
                        }
                        $scope.timeline.start = $scope.timeline.data.length;
                        utils.toggleInfiniteScrolling($scope.timeline, data.actions);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.timeline);
                    }
                );
            },
            getTimelineDayHeader: function (timelineObj) {
                var today = new Date();
                var yesterday = new Date((new Date()).setDate(today.getDate() - 1));
                var tlObjTime = new Date(timelineObj.actionTime);
                if (utils.isSameDay(today, tlObjTime)) {
                    return $filter("translate")("timeline_today");
                } else if (utils.isSameDay(yesterday, tlObjTime)) {
                    return $filter("translate")("timeline_yesterday");
                } else {
                    return $filter("dateFromMillis")(timelineObj.actionTime);
                }
            },
            getTimelineEntryTime: function (timelineObj) {
                var tlObjTime = new Date(timelineObj.actionTime);
                if (utils.isSameDay(new Date(), tlObjTime)) {
                    //today
                    return utils.timeSince(tlObjTime);
                } else {
                    return $filter("date")(tlObjTime, "shortTime");
                }
            },
            getTimelineEntryType: function (timelineObj) {
                if (timelineObj.session != null) {
                    return $scope.TimelineEntryTypes._SESSION;
                }
                else if (timelineObj.highlight != null) {
                    return $scope.TimelineEntryTypes._HIGHLIGHT;
                }
                else if (timelineObj.movie != null) {
                    return $scope.TimelineEntryTypes._MOVIE;
                }
                else if (timelineObj.user != null) {
                    return $scope.TimelineEntryTypes._USER;
                }
                else if (timelineObj.checkin != null) {
                    return $scope.TimelineEntryTypes._CHECKIN;
                }
                else {
                    return $scope.TimelineEntryTypes._CONTENT_DELETED;
                }
            },
            getActionDescription: function (timelineObj) {
                var actionPerformer = timelineObj.actionPerformer.displayName;
                if ($scope.TimelineActionTypes._LikeHighlightEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>" + actionPerformer + "</span> <span>" + $filter('translate')("timeline_action_like_highlight") + "</span>");
                } else if ($scope.TimelineActionTypes._NewHighlightCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>" + actionPerformer + "</span> <span>" + $filter('translate')("timeline_action_comment_highlight") + "</span>");
                } else if ($scope.TimelineActionTypes._LikeMovieEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_like_movie")+"</span>");
                } else if ($scope.TimelineActionTypes._NewMovieCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_comment_movie")+"</span>");
                } else if ($scope.TimelineActionTypes._NewMovieEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_new_movie")+"</span>");
                } else if ($scope.TimelineActionTypes._LikeCheckinEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>" + actionPerformer + "</span> <span>" + $filter('translate')("timeline_action_like_checkin") + "</span>");
                } else if ($scope.TimelineActionTypes._NewCheckinCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>" + actionPerformer + "</span> <span>" + $filter('translate')("timeline_action_comment_checkin") + "</span>");
                } else if ($scope.TimelineActionTypes._LikeSessionEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>" + actionPerformer + "</span> <span>" + $filter('translate')("timeline_action_like_session") + "</span>");
                } else if ($scope.TimelineActionTypes._NewSessionCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>" + actionPerformer + "</span> <span>" + $filter('translate')("timeline_action_comment_session") + "</span>");
                }
                return null;
            },
            evaluateDay: function (timelineObj) {
                var tlObjTime = new Date(timelineObj.actionTime);
                var tlObjTimeKey = "" + tlObjTime.getFullYear() + tlObjTime.getMonth() + tlObjTime.getDate();
                if ($scope.timeline.daysEvaluated[tlObjTimeKey] == undefined) {
                    $scope.timeline.daysEvaluated[tlObjTimeKey] = timelineObj.id;
                }
            },
            isFirstItemOfTheDay: function (timelineObj) {
                var tlObjTime = new Date(timelineObj.actionTime);
                var tlObjTimeKey = "" + tlObjTime.getFullYear() + tlObjTime.getMonth() + tlObjTime.getDate();
                if ($scope.timeline.daysEvaluated[tlObjTimeKey] != undefined && $scope.timeline.daysEvaluated[tlObjTimeKey] == timelineObj.id) {
                    return true;
                } else {
                    return false;
                }
            }
        };

        $scope.sessions = {
            data: [],
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.sessions.busy) return;
                utils.toggleInfiniteScrolling($scope.sessions);

                Session.sessionsByOwnerId($scope.user.id, $scope.sessions.start, $scope.sessions.limit,
                    function (data) {
                        for (var i = 0; i < data.sessions.length; i++) {
                            $scope.sessions.data.push(data.sessions[i]);
                        }
                        $scope.sessions.start = $scope.sessions.data.length;
                        utils.toggleInfiniteScrolling($scope.sessions, data.sessions);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.sessions);
                    }
                );
            }
        };

        $scope.highlights = {
            data: [],
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.highlights.busy) return;
                utils.toggleInfiniteScrolling($scope.highlights);

                Highlight.highlightsByOwnerId($scope.user.id, $scope.highlights.start, $scope.highlights.limit,
                    function (data) {
                        for (var i = 0; i < data.highlights.length; i++) {
                            $scope.highlights.data.push(data.highlights[i]);
                        }
                        $scope.highlights.start = $scope.highlights.data.length;
                        utils.toggleInfiniteScrolling($scope.highlights, data.highlights);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.highlights);
                    }
                );
            }
        };

        $scope.checkins = {
            data: [],
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.checkins.busy) return;
                utils.toggleInfiniteScrolling($scope.checkins);

                Checkin.checkinsByOwnerId($scope.user.id, $scope.checkins.start, $scope.checkins.limit,
                    function (data) {
                        for (var i = 0; i < data.checkins.length; i++) {
                            $scope.checkins.data.push(data.checkins[i]);
                        }
                        $scope.checkins.start = $scope.checkins.data.length;
                        utils.toggleInfiniteScrolling($scope.checkins, data.checkins);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.checkins);
                    }
                );
            }
        };

        $scope.movies = {
            data: [],
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.movies.busy) return;
                utils.toggleInfiniteScrolling($scope.movies);

                Movie.moviesByOwnerId($scope.user.id, $scope.movies.start, $scope.movies.limit,
                    function (data) {
                        for (var i = 0; i < data.movies.length; i++) {
                            $scope.movies.data.push(data.movies[i]);
                        }
                        $scope.movies.start = $scope.movies.data.length;
                        utils.toggleInfiniteScrolling($scope.movies, data.movies);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.movies);
                    }
                );
            }
        };

        $scope.friends = {
            data: [],
            daysEvaluated: {},
            busy: false,
            disabled: true,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.friends.busy) return;
                utils.toggleInfiniteScrolling($scope.friends);

                Friend.friendsByUserId($scope.user.id, $scope.friends.start, $scope.friends.limit,
                    function (data) {
                        for (var i = 0; i < data.friends.length; i++) {
                            $scope.friends.data.push(data.friends[i]);
                        }
                        $scope.friends.start = $scope.friends.data.length;
                        utils.toggleInfiniteScrolling($scope.friends, data.friends);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.friends);
                    }
                );
            },
            goToFriendProfile: function (userId) {
                $state.go("user", {userId: userId});
            }
        };

//        $scope.friends.nextPage();
    };

})(); 