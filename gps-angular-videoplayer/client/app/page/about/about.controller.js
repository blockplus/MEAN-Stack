(function () {
    "use strict";

    angular.module("app.about")
        .controller("aboutCtrl", ['$scope', '$location', '$anchorScroll', aboutCtrl])
        .controller("aboutEditVideoCtrl", ['$scope', '$location', '$anchorScroll', aboutEditVideoCtrl])
        .controller("aboutUploadDropboxCtrl", ['$scope', '$location', '$anchorScroll', aboutUploadDropboxCtrl]);

    function aboutCtrl($scope, $location, $anchorScroll) {
        // google analytics tracking
        ga('send', 'pageview', "about");

        $scope.goto = function(hash) {
            $location.hash(hash);
            $anchorScroll();
        };
    };

    function aboutEditVideoCtrl($scope, $location, $anchorScroll) {
        // google analytics tracking
        ga('send', 'pageview', "about_edit_video");

        $scope.goto = function(hash) {
            $location.hash(hash);
            $anchorScroll();
        };
    };

    function aboutUploadDropboxCtrl($scope, $location, $anchorScroll) {
        // google analytics tracking
        ga('send', 'pageview', "about_upload_dropbox");

        $scope.goto = function(hash) {
            $location.hash(hash);
            $anchorScroll();
        };
    };
})();