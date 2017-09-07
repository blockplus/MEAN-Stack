/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrCheckinComments", ["com.mondayreplay.libs.Digest"])
        .directive("mrCheckinComments", ["$uibModal", function ($uibModal) {
            return {
                restrict: "E",
                transclude: true,
                template: "<div><ng-transclude></ng-transclude></div>",
                scope: {
                    checkinId: "="
                },
                controller: function ($scope, $element) {

                },
                link: function ($scope, $element) {
                    $element.bind('click', function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "app/libs/directives/mr-checkin-comments/mr-checkin-comments.html",
                            controller: 'mrCheckinCommentsModalCtrl',
                            windowClass: "mr-checkin-comments-modal",
                            resolve: {
                                checkinId: function () {
                                    return $scope.checkinId;
                                }
                            }
                        });
                    });
                }
            };
        }])
        .controller("mrCheckinCommentsModalCtrl", ["$scope", "utils", "Checkin", "Digest", "checkinId", function ($scope, utils, Checkin, Digest, checkinId) {
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

                    Checkin.comments(checkinId, $scope.comments.start, $scope.comments.limit,
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
                    Checkin.newcomment(Digest.digest(), checkinId, $scope.comment, function (data) {
                        $scope.reloadComments();

                        ga('send', 'event', "checkin", "new_comment");

                    }, function (data, status) {

                    });
                }
            };
        }]);
})();
