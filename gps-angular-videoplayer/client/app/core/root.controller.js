(function () {
    "use strict";

    angular.module("app")
        .controller("rootCtrl", ["$rootScope", "$state", "$cookies", "Config", rootCtrl]);

    function rootCtrl($rootScope, $state, $cookies, Config) {
        if (!$cookies.get(Config.DEVICE_ID_COOKIE)) {
            $cookies.put(Config.DEVICE_ID_COOKIE,uuid());
        }

        if ($rootScope.isAuthenticated) {
            $state.go("userfeed");

        } else {
            $state.go("home");
        }
    }

    function uuid() {
        var chars = "0123456789abcdef".split("");

        var uuid = [], rnd = Math.random, r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4"; // version 4

        for (var i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | rnd() * 16;

                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
            }
        }

        return uuid.join("");
    }
})();