(function () {
    "use strict";

    angular.module("app.editsession")
        .controller("editsessionCtrl", ["$scope", "$state", "$filter", "logger", "Session", "userProfile", "session", editsessionCtrl]);

    function editsessionCtrl($scope, $state, $filter, logger, Session, userProfile, session) {
        // google analytics tracking
        ga('send', 'pageview', "edit_session");

        $scope.session = session.session;
        $scope.userId = userProfile.id;
        $scope.selectedFriends = $scope.session.friendtags || [];

        $scope.update = function () {
            var friendstag = $scope.selectedFriends.map(function (friend) {
                return friend.id;
            });

            Session.update($scope.session.id, $scope.session.name, $scope.session.description, undefined, undefined, undefined, friendstag, undefined, function (data) {
                ga('send', 'event', "content", "update", "SESSION");
                $state.go("session", {sessionId: $scope.session.id});

            }, function (data, status) {
                if (status == 500 && data.exception == "com.mondayreplay.api.commons.Unauthorize") {
                    logger.logError($filter("translate")("unauthorized"));

                } else {
                    logger.logError($filter("translate")("no_internet_connection"));
                }
            });
        };
    }
})();