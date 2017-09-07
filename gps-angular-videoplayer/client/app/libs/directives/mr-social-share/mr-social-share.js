/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrSocialShare", ["720kb.socialshare"])
        .directive("mrSocialShare", ["$uibModal", function ($uibModal) {
            return {
                restrict: "E",
                transclude: true,
                template: "<div><ng-transclude></ng-transclude></div>",
                scope: {
                    url: "="
                },
                controller: function ($scope, $element) {

                },
                link: function ($scope, $element) {
                    $element.bind('click', function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "app/libs/directives/mr-social-share/mr-social-share.html",
                            controller: 'mrSocialShareModalCtrl',
                            windowClass: "mr-social-share-modal",
                            resolve: {
                                url: function () {
                                    return $scope.url;
                                }
                            }
                        });
                    });
                }
            };
        }])
        .controller("mrSocialShareModalCtrl", ["$scope", "$window", "url", function ($scope, $window, url) {
            if (url) {
                $scope.url = url;
            } else {
                $scope.url = $window.location.href;
            }
        }]);
})();
