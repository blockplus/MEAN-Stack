(function () {
    'use strict';

    angular.module('app.explore')
        .controller('exploreCtrl', ['$scope', 'Highlight', 'Hashtag', exploreCtrl]);

    function exploreCtrl($scope, Highlight, Hashtag) {
        // google analytics tracking
        ga('send', 'pageview', "explore");

        $scope.selectedHashtags = [];

        $scope.onUpdateBounds = function (polygon) {
            $scope.filterPolygon = polygon;
            $scope.search();
        };

        $scope.onPlaceClick = function (place) {
            // TODO
        };

        $scope.$watch("selectedHashtags", function (selectedHashtags) {
            if ($scope.selectedHashtags && $scope.selectedHashtags.length ==0) {
                $scope.filterHashtags = undefined;
            } else {
                $scope.filterHashtags = $scope.selectedHashtags;
            }

            $scope.search();
        }, true);

        $scope.search = function () {
            Highlight.search(undefined, $scope.filterHashtags, $scope.filterPolygon, 0, 20, function (data) {
                $scope.highlights = data.highlights;

            }, function (data, status) {

            });

            Hashtag.search(undefined, $scope.filterHashtags, $scope.filterPolygon, 0, 0, function (data) {
                $scope.hashtags = data.hashtags;

            }, function (data, status) {

            });
        };
    }

})(); 