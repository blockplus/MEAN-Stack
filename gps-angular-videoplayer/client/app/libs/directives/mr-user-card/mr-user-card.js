/*eslint */
/*global angular */
( function() {
	"use strict";

	angular.module("com.mondayreplay.libs.directives.mrUserCard", ["com.mondayreplay.libs.AssetsManager"])
        .directive("mrUserCard", ["$state", "AssetsManager", "CheckinUtils", function ($state, AssetsManager, CheckinUtils) {
            return {
                restrict: "E",
                templateUrl: function(elem, attr){
                    return attr.isTimelineCard == "true"
                        ? "app/libs/directives/mr-user-card/mr-user-timeline-card.html"
                        : "app/libs/directives/mr-user-card/mr-user-card.html";
                },
                scope: {
                    user: "=",
                    isTimelineCard: "=",
                    timelineObj: "=",
                    timelineCtrl: "=timelineController"
                },
                controller: function($scope, $element){
//                    $scope.user.sports = $scope.user.sports || ['KAYAK', 'SNOWBOARD'];
//                    $scope.user.dob = $scope.user.dob || new Date();
                    $scope.goToFriendProfile = function(userId){
                        $state.go('user',{ userId : userId });
                    };

                    $scope.getSportIcon = function(sport) {
                        return CheckinUtils.getSportIcon(sport);
                    };
                }
            };
        }]);
} )();
