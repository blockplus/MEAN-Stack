(function () {
    'use strict';

    angular.module('app.userfeed')
        .controller('userfeedCtrl', ['$scope', '$filter', '$sce', 'logger', 'utils', 'Timeline', 'userProfile', userfeedCtrl]);

    function userfeedCtrl($scope, $filter, $sce, logger, utils, Timeline, userProfile) {
        // google analytics tracking
        ga('send', 'pageview', "userfeed");

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
            disabled: false,
            start: 0,
            limit: 30,
            nextPage: function() {
                if ($scope.timeline.busy) return;
                utils.toggleInfiniteScrolling($scope.timeline);

                Timeline.actionsUserFeed(undefined, undefined, $scope.timeline.start, $scope.timeline.limit,
                    function(data){
                        for (var i = 0; i < data.actions.length; i++) {
                            $scope.timeline.data.push(data.actions[i]);
                        }
                        $scope.timeline.start = $scope.timeline.data.length;
                        utils.toggleInfiniteScrolling($scope.timeline, data.actions);
                    },function(data, status){
                        logger.logError($filter('translate')("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.timeline);
                    }
                );
            },
            getTimelineDayHeader: function(timelineObj){
                var today = new Date();
                var yesterday = new Date((new Date()).setDate(today.getDate() - 1));
                var tlObjTime = new Date(timelineObj.actionTime);
                if(utils.isSameDay(today, tlObjTime)){
                    return $filter('translate')("timeline_today");
                }else if(utils.isSameDay(yesterday, tlObjTime)){
                    return $filter('translate')("timeline_yesterday");
                }else{
                    return $filter('dateFromMillis')(timelineObj.actionTime);
                }
            },
            getTimelineEntryTime: function(timelineObj){
                var tlObjTime = new Date(timelineObj.actionTime);
                if(utils.isSameDay(new Date(), tlObjTime)){
                    //today
                    return utils.timeSince(tlObjTime);
                }else{
                    return $filter('date')(tlObjTime, 'shortTime');
                }
            },
            getTimelineEntryType: function(timelineObj){
                if(timelineObj.session!=null){
                    return $scope.TimelineEntryTypes._SESSION;
                }
                else if(timelineObj.highlight!=null){
                    return $scope.TimelineEntryTypes._HIGHLIGHT;
                }
                else if(timelineObj.movie!=null){
                    return $scope.TimelineEntryTypes._MOVIE;
                }
                else if(timelineObj.user!=null){
                    return $scope.TimelineEntryTypes._USER;
                }
                else if(timelineObj.checkin!=null){
                    return $scope.TimelineEntryTypes._CHECKIN;
                }
                else{
                    return $scope.TimelineEntryTypes._CONTENT_DELETED;
                }
            },
            getActionDescription: function(timelineObj){
                var actionPerformer = timelineObj.actionPerformer.displayName;
                if ($scope.TimelineActionTypes._LikeHighlightEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_like_highlight")+"</span>");
                } else if ($scope.TimelineActionTypes._NewHighlightCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_comment_highlight")+"</span>");
                } else if ($scope.TimelineActionTypes._LikeMovieEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_like_movie")+"</span>");
                } else if ($scope.TimelineActionTypes._NewMovieCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_comment_movie")+"</span>");
                } else if ($scope.TimelineActionTypes._NewMovieEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_new_movie")+"</span>");
                } else if ($scope.TimelineActionTypes._LikeCheckinEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_like_checkin")+"</span>");
                } else if ($scope.TimelineActionTypes._NewCheckinCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_comment_checkin")+"</span>");
                } else if ($scope.TimelineActionTypes._LikeSessionEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_like_session")+"</span>");
                } else if ($scope.TimelineActionTypes._NewSessionCommentEvent == timelineObj.action) {
                    return $sce.trustAsHtml("<span class='tl-action-performer'>"+actionPerformer+"</span> <span>"+$filter('translate')("timeline_action_comment_session")+"</span>");
                }
                return null;
            },
            evaluateDay: function(timelineObj){
                var tlObjTime = new Date(timelineObj.actionTime);
                var tlObjTimeKey = ""+tlObjTime.getFullYear()+tlObjTime.getMonth()+tlObjTime.getDate();
                if($scope.timeline.daysEvaluated[tlObjTimeKey]==undefined){
                    $scope.timeline.daysEvaluated[tlObjTimeKey] = timelineObj.id;
                }
            },
            isFirstItemOfTheDay: function(timelineObj){
                var tlObjTime = new Date(timelineObj.actionTime);
                var tlObjTimeKey = ""+tlObjTime.getFullYear()+tlObjTime.getMonth()+tlObjTime.getDate();
                if($scope.timeline.daysEvaluated[tlObjTimeKey]!=undefined && $scope.timeline.daysEvaluated[tlObjTimeKey] == timelineObj.id){
                    return true;
                }else{
                    return false;
                }
            }
        };

    };

})(); 