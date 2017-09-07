(function () {
    'use strict';

    angular.module('app')
        .controller('NotificationsCtrl', ['$scope', '$rootScope', '$state', '$filter', '$sce', 'utils', 'logger', 'UserManager', 'Notification', NotificationsCtrl]);

    function NotificationsCtrl($scope, $rootScope, $state, $filter, $sce, utils, logger, UserManager, Notification) {

        Notification.count(function(data){
            $scope.notificationsCount = data.count;
        }, function (data, status) {
            //TODO: error handling
//            logger.logError($filter('translate')("internal_service_error"));
        });

        $scope.$watch("status.isopenNotifications", function (isOpen) {
            if(isOpen){
                if($scope.notificationsCount > 0){
                    Notification.clearCount(function(data){
                        $scope.notificationsCount = 0;
                    }, function (data, status) {
                        //TODO: error handling
//                    logger.logError($filter('translate')("internal_service_error"));
                    });
                }
                $scope.reloadNotifications();
            }
        }, true);

        $scope.reloadNotifications = function () {
            $scope.notifications.data = [];
            $scope.notifications.start = 0;
            $scope.notifications.limit = 10;
            $scope.notifications.nextPage();
        };

        $scope.NotificationType = {};
        $scope.NotificationType._NewSessionEvent = "NewSessionEvent";
        $scope.NotificationType._NewClipAvailableEvent = "NewClipAvailableEvent";
        $scope.NotificationType._NewHighlightEvent = "NewHighlightEvent";
        $scope.NotificationType._LikeHighlightEvent = "LikeHighlightEvent";
        $scope.NotificationType._NewHighlightCommentEvent = "NewHighlightCommentEvent";
        $scope.NotificationType._TaggedInHighlightEvent = "TaggedInHighlightEvent";
        $scope.NotificationType._NewMovieEvent = "NewMovieEvent";
        $scope.NotificationType._LikeMovieEvent = "LikeMovieEvent";
        $scope.NotificationType._NewMovieCommentEvent = "NewMovieCommentEvent";
        $scope.NotificationType._TaggedInMovieEvent = "TaggedInMovieEvent";
        $scope.NotificationType._LikeCheckinEvent = "LikeCheckinEvent";
        $scope.NotificationType._NewCheckinCommentEvent = "NewCheckinCommentEvent";
        $scope.NotificationType._TaggedInCheckinEvent = "TaggedInCheckinEvent";
        $scope.NotificationType._LikeSessionEvent = "LikeSessionEvent";
        $scope.NotificationType._NewSessionCommentEvent = "NewSessionCommentEvent";
        $scope.NotificationType._TaggedInSessionEvent = "TaggedInSessionEvent";
        $scope.NotificationType._RequestFriendship = "RequestFriendship";
        $scope.NotificationType._AcceptFriendship = "AcceptFriendship";

        $scope.notifications = {
            data: [],
            busy: false,
            disabled: false,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.notifications.busy) return;
                utils.toggleInfiniteScrolling($scope.notifications);

                Notification.notifications($scope.notifications.start, $scope.notifications.limit,
                    function (data) {
                        for (var i = 0; i < data.notifications.length; i++) {
                            $scope.notifications.data.push(data.notifications[i]);
                        }
                        $scope.notifications.start = $scope.notifications.data.length;
                        utils.toggleInfiniteScrolling($scope.notifications, data.notifications);

                    }, function (data, status) {
                        logger.logError($filter('translate')("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.notifications);
                    }
                );
            },
            markAsRead: function (notification) {
                Notification.markAsRead(notification.id);
            },
            getNotificationUiSref: function (notification) {
                if ($scope.NotificationType._NewSessionEvent == notification.notificationType && notification.session != null) {
                    return $state.href('session', { sessionId: notification.session.id });
                } else if ($scope.NotificationType._NewClipAvailableEvent == notification.notificationType && notification.session != null) {
                    return $state.href('session', { sessionId: notification.session.id, clipId: notification.clip.id });
                } else if ($scope.NotificationType._NewHighlightEvent == notification.notificationType && notification.highlight != null) {
                    return $state.href('highlight', { highlightId: notification.highlight.id });
                } else if ($scope.NotificationType._LikeHighlightEvent == notification.notificationType && notification.highlight != null) {
                    return $state.href('highlight', { highlightId: notification.highlight.id });
                } else if ($scope.NotificationType._NewHighlightCommentEvent == notification.notificationType && notification.highlight != null) {
                    return $state.href('highlight', { highlightId: notification.highlight.id });
                } else if ($scope.NotificationType._TaggedInHighlightEvent == notification.notificationType && notification.highlight != null) {
                    return $state.href('highlight', { highlightId: notification.highlight.id });
                } else if ($scope.NotificationType._NewMovieEvent == notification.notificationType && notification.movie != null) {
                    return $state.href('movie', { movieId: notification.movie.id });
                } else if ($scope.NotificationType._LikeMovieEvent == notification.notificationType && notification.movie != null) {
                    return $state.href('movie', { movieId: notification.movie.id });
                } else if ($scope.NotificationType._NewMovieCommentEvent == notification.notificationType && notification.movie != null) {
                    return $state.href('movie', { movieId: notification.movie.id });
                } else if ($scope.NotificationType._TaggedInMovieEvent == notification.notificationType && notification.movie != null) {
                    return $state.href('movie', { movieId: notification.movie.id });
                } else if ($scope.NotificationType._LikeCheckinEvent == notification.notificationType) {
                    return null;
                } else if ($scope.NotificationType._NewCheckinCommentEvent == notification.notificationType) {
                    return null;
                } else if ($scope.NotificationType._TaggedInCheckinEvent == notification.notificationType) {
                    return null;
                } else if ($scope.NotificationType._LikeSessionEvent == notification.notificationType && notification.session != null) {
                    return $state.href('session', { sessionId: notification.session.id });
                } else if ($scope.NotificationType._NewSessionCommentEvent == notification.notificationType && notification.session != null) {
                    return $state.href('session', { sessionId: notification.session.id });
                } else if ($scope.NotificationType._TaggedInSessionEvent == notification.notificationType && notification.session != null) {
                    return $state.href('session', { sessionId: notification.session.id });
                } else if ($scope.NotificationType._RequestFriendship == notification.notificationType) {
                    return $state.href('user', { userId: notification.actionPerformer.id });
                } else if ($scope.NotificationType._AcceptFriendship == notification.notificationType) {
                    return $state.href('user', { userId: notification.actionPerformer.id });
                }
            },
            getNotificationNumberText: function(){
                return _.template($filter('translate')('notifications_number'))({ number: 0 });
            },
            getNotificationDateInfo: function(notification) {
                var today = new Date();
                var yesterday = new Date((new Date()).setDate(today.getDate() - 1))
                var notifObjTime = new Date(notification.created);
                if(utils.isSameDay(today, notifObjTime)){
                    return $filter('translate')("timeline_today") + " @ " + $filter('dateFromMillis')(notifObjTime, 'HH:mm');
                }else if(utils.isSameDay(yesterday, notifObjTime)){
                    return $filter('translate')("timeline_yesterday") + " @ " + $filter('dateFromMillis')(notifObjTime, 'HH:mm');
                }else{
                    return $filter('dateFromMillis')(notifObjTime, 'd MMM @ HH:mm');
                }
            },
            getText: function(notification) {
                if ($scope.NotificationType._NewSessionEvent == notification.notificationType) {
                    if (notification.session == null) {
                        return $filter('translate')('content_deleted');
                    }
                    if (UserManager.getUserProfile().id == notification.session.ownerId) {
                        return $sce.trustAsHtml(_.template($filter('translate')('notification_new_session'))({ sessionName: "<strong>"+notification.session.name+"</strong>" }));
                    } else {
                        return $sce.trustAsHtml(_.template($filter('translate')('notification_new_session_friend'))({
                            actionPerformer: notification.actionPerformer.displayName,
                            sessionName: "<strong>"+notification.session.name+"</strong>"
                        }));
                    }
                } else if ($scope.NotificationType._NewClipAvailableEvent == notification.notificationType) {
                    if (notification.session == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_new_clip_available'))({
                        clipsAvailable: notification.session.clipsAvailable,
                        clips: notification.session.clips,
                        sessionName: "<strong>"+notification.session.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._NewHighlightEvent == notification.notificationType) {
                    if (notification.highlight == null) {
                        return $filter('translate')('content_deleted');
                    }
                    if (notification.highlight.session != null) {
                        return $sce.trustAsHtml(_.template($filter('translate')('notification_new_highlight_from_session'))({
                            actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                            highlightName: notification.highlight.name,
                            sessionName: "<strong>"+notification.highlight.session.name+"</strong>"
                        }));
                    } else {
                        return $sce.trustAsHtml(_.template($filter('translate')('notification_new_highlight'))({
                            actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                            highlightName: notification.highlight.name
                        }));
                    }
                } else if ($scope.NotificationType._LikeHighlightEvent == notification.notificationType) {
                    if (notification.highlight == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_like_highlight'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        highlightName: notification.highlight.name
                    }));
                } else if ($scope.NotificationType._NewHighlightCommentEvent == notification.notificationType) {
                    if (notification.highlight == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_comment_highlight'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        highlightName: "<strong>"+notification.highlight.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._TaggedInHighlightEvent == notification.notificationType) {
                    if (notification.highlight == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_tagged_in_highlight'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        highlightName: "<strong>"+notification.highlight.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._NewMovieEvent == notification.notificationType) {
                    if (notification.movie == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_new_movie'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        movieName: notification.movie.name
                    }));
                } else if ($scope.NotificationType._LikeMovieEvent == notification.notificationType) {
                    if (notification.movie == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_like_movie'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        movieName: notification.movie.name
                    }));
                } else if ($scope.NotificationType._NewMovieCommentEvent == notification.notificationType) {
                    if (notification.movie == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_comment_movie'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        movieName: "<strong>"+notification.movie.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._TaggedInMovieEvent == notification.notificationType) {
                    if (notification.movie == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_tagged_in_movie'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        movieName: "<strong>"+notification.movie.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._LikeCheckinEvent == notification.notificationType) {
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_like_checkin'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        placeName: "<strong>"+notification.checkin.place.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._NewCheckinCommentEvent == notification.notificationType) {
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_comment_checkin'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        placeName: "<strong>"+notification.checkin.place.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._TaggedInCheckinEvent == notification.notificationType) {
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_tagged_in_checkin'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        placeName: "<strong>"+notification.checkin.place.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._LikeSessionEvent == notification.notificationType) {
                    if (notification.session == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_like_session'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        sessionName: "<strong>"+notification.session.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._NewSessionCommentEvent == notification.notificationType) {
                    if (notification.session == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_comment_session'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        sessionName: "<strong>"+notification.session.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._TaggedInSessionEvent == notification.notificationType) {
                    if (notification.session == null) {
                        return $filter('translate')('content_deleted');
                    }
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_tagged_in_session'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>",
                        sessionName: "<strong>"+notification.session.name+"</strong>"
                    }));
                } else if ($scope.NotificationType._RequestFriendship == notification.notificationType) {
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_request_friendship'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>"
                    }));
                } else if ($scope.NotificationType._AcceptFriendship == notification.notificationType) {
                    return $sce.trustAsHtml(_.template($filter('translate')('notification_accept_friendship'))({
                        actionPerformer: "<strong>"+notification.actionPerformer.displayName+"</strong>"
                    }));
                }

                return $filter('translate')('notification_update_required');
            }
        };
        
    }

})();