(function () {
    "use strict";

    angular.module("app.editmovie")
        .controller("editmovieCtrl", ["$scope", "$filter", "$mdDialog", "logger", "utils", "Highlight", "userProfile", editmovieCtrl]);

    function editmovieCtrl($scope, $filter, $mdDialog, logger, utils, Highlight, userProfile) {
        // google analytics tracking
        ga('send', 'pageview', "edit_movie");

        $scope.userId = userProfile.id;

//        $scope.sortableClone = {
//            options: {
//                containment: '#sortable-container',
//                clone: true,
//            }
//        };

        $scope.starredHighlights = {
            data: [],
            busy: false,
            disabled: false,
            start: 0,
            limit: 30,
            nextPage: function () {
                if ($scope.starredHighlights.busy) return;
                utils.toggleInfiniteScrolling($scope.starredHighlights);

                Highlight.highlightsStarred($scope.starredHighlights.start, $scope.starredHighlights.limit,
                    function (data) {
                        for (var i = 0; i < data.highlights.length; i++) {
                            $scope.starredHighlights.data.push(data.highlights[i]);
                        }
                        $scope.starredHighlights.start = $scope.starredHighlights.data.length;
                        utils.toggleInfiniteScrolling($scope.starredHighlights, data.highlights);
                    }, function (data, status) {
                        logger.logError($filter("translate")("internal_service_error"));
                        utils.toggleInfiniteScrolling($scope.starredHighlights);
                    }
                );
            },
            clear: function() {
                if(!$scope.starredHighlights.clearBusy){

                    var confirm = $mdDialog.confirm()
                        .title($filter("translate")("editmovie_clear_starred_highlights_confirm_title"))
                        .content($filter("translate")("editmovie_clear_starred_highlights_confirm_content"))
                        .ok($filter("translate")("editmovie_clear_starred_highlights_confirm_ok"))
                        .cancel($filter("translate")("editmovie_clear_starred_highlights_confirm_cancel"));

                    $mdDialog.show(confirm).then(function() {
                        $scope.starredHighlights.clearBusy = true;
                        Highlight.unmarkAllAsStarred(function (response) {
                            $scope.starredHighlights.data = [];
                            $scope.starredHighlights.clearBusy = false;
                        }, function (data, status) {
                            $scope.starredHighlights.clearBusy = false;
                            logger.logError($filter("translate")("internal_service_error"));
                        });
                    }, function() {
                    });
                }
            },
            onHighlightStarredToggle: function(highlight){
                if(!highlight.starred){
                    $scope.starredHighlights.data.splice(_.findIndex($scope.starredHighlights.data,function(hl){
                        return hl.id == highlight.id;
                    }),1);
                }
            },
            highlightClick: function(highlight){
                $scope.addHighlightToTimeline(highlight);
            },
            showHighlightPreview: function(highlight){
                console.log(highlight);
            }
        };
    }
})();