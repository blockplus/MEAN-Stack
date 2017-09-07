/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.Digest", ["com.mondayreplay.libs.UserManager"])
        .factory("Digest", ["UserManager", function (UserManager) {
            var dataFactory = {};

            dataFactory.digest = function () {
                return UserManager.getUserProfile().id + '/' + (new Date().toISOString());
            };

            return dataFactory;
        }]);
})();
