/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrWizardStartnow", [])
        .directive("mrWizardStartnow", ["$rootScope", "$filter", "$compile", "$window", "Config", "Dropbox", "UserManager", function ($rootScope, $filter, $compile, $window, Config, Dropbox, UserManager) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-wizard-startnow/mr-wizard-startnow.html",
                scope: {
                    onFinished: "="
                },
                controller: function ($scope, $element) {

                },
                link: function ($scope, $element) {
                    $scope.loginByFacebook = $rootScope.loginByFacebook;

                    $rootScope.$watch("isAuthenticated", function (isAuthenticated) {
                        if ($rootScope.isAuthenticated) {
                            $scope.wizard.steps("next");
                        }
                    });

                    $rootScope.$watch("userProfile", function (userProfile) {
                        if ($rootScope.userProfile.dropboxId) {
                            $scope.wizard.steps("next");
                        }
                    });

                    function getHashValue(key) {
                        var matches = $window.location.hash.match(new RegExp(key + "=([^&]*)"));
                        return matches ? matches[1] : null;
                    }

                    var access_token = getHashValue("access_token");
                    var state = getHashValue("state");
                    if (access_token != null && state == $rootScope.userProfile.id) {
                        Dropbox.connect(access_token, function (data) {
                            UserManager.refreshToken();

                        }, function (data, status) {

                        });
                    }

                    $scope.connectDropbox = function () {
                        var redirectUri = $window.location.href.replace("http:", "https:");
                        $window.location = "https://www.dropbox.com/1/oauth2/authorize?response_type=token&client_id=" + Config.DROPBOXID + "&state=" + $rootScope.userProfile.id + "&redirect_uri=" + redirectUri;
                    };


                    $scope.wizard = $element.find("#wizard-container").steps({
                        transitionEffect: "slideLeft",
                        forceMoveForward: true,
                        labels: {
                            next: $filter("translate")("action_next")
                        },
                        onStepChanging: function (event, currentIndex, newIndex) {
                            if (currentIndex == 0) {
                                return $rootScope.isAuthenticated;
                            }

                            return true;
                        },
                        onFinished: function (event, currentIndex) {
                            $scope.onFinished();
                        }
                    });
                    $compile($scope.wizard)($scope);
                }
            };
        }])
})();
