/*eslint */
/*global angular */
( function() {
    "use strict";

    angular.module("Lib.Services.Config", [])
    .constant("Config", {
        AUTH_TOKEN_COOKIE: "X-AUTH-TOKEN-MR",
        AUTH_USER_PROFILE: "X-AUTH-USER-PROFILE-MR",
        DEVICE_ID_COOKIE: "X-DEVICE-ID-MR",
        APP_NAME: "MondayReplayDev",
        APP_VERSION: "1.8.0",
        PREFERRED_LANGUAGE_COOKIE: "X-PREF_LANG",
        API_URL: "//devapi.mondayreplay.com",
        DS_URL: "//devds1.mondayreplay.com",
        CDN_URL: "//devcdn.mondayreplay.com",
        NECOMONI_URL: "//devmondayreplay.necomoni.com",
        FBAPPID: 889719994449063,
        DROPBOXID: "a5wqi58a4k5opdf"
    });
} )();
