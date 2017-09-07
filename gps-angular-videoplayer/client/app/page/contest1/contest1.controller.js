(function () {
    "use strict";

    angular.module("app.contest1", ["com.mondayreplay.api.enduser.Contest"])
        .controller("contest1Ctrl", ["$scope", "$state", "Config", "AssetsManager", "Contest", contest1Ctrl]);

    function contest1Ctrl($scope, $state, Config, AssetsManager, Contest) {
        // google analytics tracking
        ga('send', 'pageview', "contest1");

        $scope.necomoniUrl = Config.NECOMONI_URL;

        Contest.ranking("573c16c1272b2cce87bfe8ea", 0, 20, function (data) {
            $scope.items = data.items;

        }, function (data, status) {

        });

        $scope.goToItem = function (item) {
            if (item.highlightId) {
                $state.go("highlight", {highlightId: item.highlight.id});

            } else {
                $state.go("movie", {movieId: item.movie.id});
            }
        };

        $scope.title = function (item) {
            if (item.highlightId) {
                return item.highlight.name;
            } else {
                return item.movie.name;
            }
        };

        $scope.ownerAvatarUrl = function (item) {
            if (item.highlightId) {
                return item.highlight.owner.avatarUrl;
            } else {
                return item.movie.owner.avatarUrl;
            }
        };

        $scope.ownerDisplayName = function (item) {
            if (item.highlightId) {
                return item.highlight.owner.displayName;
            } else {
                return item.movie.owner.displayName;
            }
        };

        $scope.thumbnail = function (item) {
            if (item.highlightId) {
                return AssetsManager.highlightThumbnail(item.highlight);
            } else {
                return AssetsManager.movieThumbnail(item.movie);
            }
        };

    }
})();