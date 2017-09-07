/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrSessionComments", ["com.mondayreplay.libs.Digest"])
        .directive("mrSessionComments", ["$uibModal", function ($uibModal) {
            return {
                restrict: "E",
                transclude: true,
                template: "<div><ng-transclude></ng-transclude></div>",
                scope: {
                    sessionId: "="
                },
                controller: function ($scope, $element) {

                },
                link: function ($scope, $element) {
                    $element.bind('click', function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "app/libs/directives/mr-session-comments/mr-session-comments.html",
                            controller: 'mrSessionCommentsModalCtrl',
                            windowClass: "mr-session-comments-modal",
                            resolve: {
                                sessionId: function () {
                                    return $scope.sessionId;
                                }
                            }
                        });
                    });
                }
            };
        }])
        .controller("mrSessionCommentsModalCtrl", ["$scope", "utils", "Session", "Digest", "sessionId", function ($scope, utils, Session, Digest, sessionId) {
            $scope.reloadComments = function () {
                $scope.reload = true;
                $scope.comment = "";
                $scope.comments.start = 0;
                $scope.comments.limit = 10;
                $scope.comments.nextPage();
            };

            $scope.comments = {
                data: [],
                busy: false,
                disabled: false,
                start: 0,
                limit: 30,
                nextPage: function () {
                    if ($scope.comments.busy) return;
                    utils.toggleInfiniteScrolling($scope.comments);

                    Session.comments(sessionId, $scope.comments.start, $scope.comments.limit,
                        function (data) {
                            if ($scope.reload) {
                                $scope.comments.data = [];
                                $scope.reload = false;
                            }
                            for (var i = 0; i < data.comments.length; i++) {
                                $scope.comments.data.push(data.comments[i]);
                            }
                            $scope.comments.start = $scope.comments.data.length;
                            utils.toggleInfiniteScrolling($scope.comments, data.comments);

                        }, function (data, status) {
                            logger.logError($filter('translate')("internal_service_error"));
                            utils.toggleInfiniteScrolling($scope.comments);
                        }
                    );
                }
            };

            $scope.send = function () {
                if ($scope.comment && $scope.comment.length > 0) {
                    Session.newcomment(Digest.digest(), sessionId, $scope.comment, function (data) {
                        $scope.reloadComments();

                        ga('send', 'event', "session", "new_comment", sessionId);

                    }, function (data, status) {

                    });
                }
            };
        }]);
})();
