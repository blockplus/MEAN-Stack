/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrInputFriends", [])
        .directive("mrInputFriends", ["$q", "Friend", function ($q, Friend) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-input-friends/mr-input-friends.html",
                scope: {
                    selectedFriends: "=",
                    userId: "=",
                    placeholder: "@"
                },
                controller: function ($scope) {
                    Friend.friendsByUserId($scope.userId, 0, 0, function (data) {
                        $scope.allFriends = data.friends;

                    }, function (data, status) {
                        $scope.allFriends = [];
                    });

                    $scope.searchFriends = function ($query) {
                        var deferred = $q.defer();
                        if ($scope.allFriends == undefined || $scope.allFriends.length == 0) {
                            deferred.reject();

                        } else {
                            var regexp = new RegExp("^" + $query, "i");
                            deferred.resolve(
                                $scope.allFriends.filter(function (friend) {
                                    return regexp.test(friend.displayName);
                                })
                            );
                        }
                        return deferred.promise;
                    };

                }
            };
        }]);
})();
