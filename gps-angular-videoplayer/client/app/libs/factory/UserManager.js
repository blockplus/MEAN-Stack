/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.UserManager", ["Lib.Services.Config", "ngCookies", "ngMaterial", "ngFacebook", "com.mondayreplay.api.enduser.Authentication"])
        .config(["$facebookProvider", "Config", function ($facebookProvider, Config) {
            $facebookProvider.setAppId(Config.FBAPPID);
            $facebookProvider.setPermissions("email,user_friends,user_birthday");
            $facebookProvider.setVersion("v2.4");
        }])

        .run(function ($rootScope) {
            // Load the facebook SDK asynchronously
            ( function () {
                // If we've already installed the SDK, we're done
                if (document.getElementById("facebook-jssdk")) {
                    return;
                }

                // Get the first script element, which we'll use to find the parent node
                var firstScriptElement = document.getElementsByTagName("script")[0];

                // Create a new script element and set its id
                var facebookJS = document.createElement("script");
                facebookJS.id = "facebook-jssdk";

                // Set the new script's source to the source of the Facebook JS SDK
                facebookJS.src = "//connect.facebook.net/en_US/all.js";

                // Insert the Facebook JS SDK into the DOM
                firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
            }());
        })


        .factory("UserManager", ["$rootScope", "$cookies", "$facebook", "$state", "$filter", "$q", "$window", "logger", "Config", "Authentication",
            function ($rootScope, $cookies, $facebook, $state, $filter, $q, $window, logger, Config, Authentication) {
                var dataFactory = {};

                dataFactory.setAuthInfo = function (authToken, userProfile) {
                    $cookies.put(Config.AUTH_TOKEN_COOKIE, authToken.authToken, {expires: new Date(authToken.expireDate)});
                    $cookies.put(Config.AUTH_USER_PROFILE, JSON.stringify(userProfile), {expires: new Date(authToken.expireDate)});
                    dataFactory.init();
                };

                dataFactory.isAuthenticated = function () {
                    return $cookies.get(Config.AUTH_TOKEN_COOKIE) && $cookies.get(Config.AUTH_USER_PROFILE);
                };

                dataFactory.getUserProfile = function () {
                    if ($cookies.get(Config.AUTH_USER_PROFILE) != null) {
                        return JSON.parse($cookies.get(Config.AUTH_USER_PROFILE));
                    } else {
                        return null;
                    }
                };

                dataFactory.getUserProfilePromise = function () {
                    var deferred = $q.defer();
                    if (dataFactory.isAuthenticated()) {
                        deferred.resolve(dataFactory.getUserProfile());
                    } else {
                        deferred.reject();
                    }
                    return deferred.promise;
                };


                dataFactory.init = function () {
                    $rootScope.isAuthenticated = dataFactory.isAuthenticated();
                    $rootScope.userProfile = dataFactory.getUserProfile();
                    $rootScope.loginByFacebook = dataFactory.loginByFacebook;
                };

                dataFactory.loginByFacebook = function (callback) {
                    $facebook.login().then(function (response) {
                        if (!response || !response.authResponse) {
                            return;
                        }

                        var accessToken = response.authResponse.accessToken;

                        Authentication.loginByFacebook(accessToken, function (data) {
                                dataFactory.setAuthInfo(data.authToken, data.profile);
                                if (data.newuser) {
                                    ga('send', 'event', "authentication", "signup", "FACEBOOK");
                                } else {
                                    ga('send', 'event', "authentication", "signin", "FACEBOOK");
                                }

                                if (callback) callback();
                            },
                            function (data, status) {
                                $state.go('500');
                            });
                    });
                };

                dataFactory.refreshToken = function () {
                    if (dataFactory.isAuthenticated()) {
                        Authentication.refreshToken(function (data) {
                            dataFactory.setAuthInfo(data.authToken, data.profile);

                            $('#loader-container').fadeOut("slow");

                        }, function (data, status) {
                            $('#loader-container').fadeOut("slow");
                            if (status == 401) {
                                $cookies.remove(Config.AUTH_TOKEN_COOKIE);
                                $cookies.remove(Config.AUTH_USER_PROFILE);
                                dataFactory.init();
                            }
                        });
                    } else {
                        $('#loader-container').fadeOut("slow");
                    }
                };

                dataFactory.logout = function () {
                    $cookies.remove(Config.AUTH_TOKEN_COOKIE);
                    $cookies.remove(Config.AUTH_USER_PROFILE);
                    dataFactory.init();

                    $window.location = $window.location.origin;
                };

                return dataFactory;
            }
        ]);
})();
