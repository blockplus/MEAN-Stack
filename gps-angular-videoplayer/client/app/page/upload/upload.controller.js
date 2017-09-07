(function () {
    "use strict";

    angular.module("app.upload")
        .controller("uploadCtrl", ["$scope", "$window", "Config", "UserManager", "Dropbox", "userProfile", uploadCtrl]);

    function uploadCtrl($scope, $window, Config, UserManager, Dropbox, userProfile) {
        // google analytics tracking
        ga("send", "pageview", "upload");

        function getHashValue(key) {
            var matches = $window.location.hash.match(new RegExp(key + "=([^&]*)"));
            return matches ? matches[1] : null;
        }

        var access_token = getHashValue("access_token");
        var state = getHashValue("state");
        if (access_token != null && state == userProfile.id) {
            Dropbox.connect(access_token, function (data) {
                UserManager.refreshToken();

            }, function (data, status) {

            });
        }

        $scope.connect = function () {
            ga('send', 'event', "social", "connect", "DROPBOX");

            var redirectUri = $window.location.href.replace("http:", "https:");
            $window.location = "https://www.dropbox.com/1/oauth2/authorize?response_type=token&client_id=" + Config.DROPBOXID + "&state=" + userProfile.id + "&redirect_uri=" + redirectUri;
        };

        $scope.disconnect = function () {
            ga('send', 'event', "social", "disconnect", "DROPBOX");

            Dropbox.disconnect(function () {
                UserManager.refreshToken();

            }, function (data, status) {

            });
        }
    }

})(); 