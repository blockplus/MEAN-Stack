/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrLastSessions", ["com.mondayreplay.libs.directives.mrSessionPreview", "com.mondayreplay.api.enduser.Session"])
        .directive("mrLastSessions", ["Session", function (Session) {
            return {
                restrict: "E",
                templateUrl: function ($elem, $attr) {
                    return "app/libs/directives/mr-last-sessions/mr-last-sessions.html";
                },
                controller: function ($scope, $element) {
                    Session.sessions(0, 8, function (data) {
                        $scope.sessions = data.sessions;

                    }, function (data, status) {
                        // TODO gestione errori
                    });
                }
            };
        }]);
})();
