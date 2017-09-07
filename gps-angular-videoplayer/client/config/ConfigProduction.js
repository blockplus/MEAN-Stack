/*eslint */
/*global angular */
( function() {
    "use strict";

    angular.module("Lib.Services.Config", [])
    .constant("Config", {
        AUTH_TOKEN_COOKIE: "X-AUTH-TOKEN-MR",
        AUTH_USER_PROFILE: "X-AUTH-USER-PROFILE-MR",
        DEVICE_ID_COOKIE: "X-DEVICE-ID-MR",
        APP_NAME: "MondayReplay",
        APP_VERSION: "1.8.0",
        PREFERRED_LANGUAGE_COOKIE: "X-PREF_LANG",
        API_URL: "//api.mondayreplay.com",
        DS_URL: "//ds1.mondayreplay.com",
        CDN_URL: "//cdn.mondayreplay.com",
        NECOMONI_URL: "//mondayreplay.necomoni.com",
        FBAPPID: 874802785940784,
        DROPBOXID: "gmb4trhkskjq99l"
    });
} )();
