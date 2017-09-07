(function () {
    "use strict";

    angular.module("app.core", [
        // Angular modules
        "ngAnimate"
        , "ngAria"
        , "ngMessages"

        // Custom modules
        , "app.layout"
        , "app.i18n"

        // 3rd Party Modules
        , "ngMaterial"
        , "ui.router"
        , "ui.bootstrap"
        , "duScroll"
        , "infinite-scroll"
//        , "ngDragDrop"
        , "angular-duration-format"
        , "ngScrollSpy"
        , "as.sortable"

        , "com.mondayreplay.libs.AssetsManager"
        , "com.mondayreplay.libs.UserManager"
        , "com.mondayreplay.libs.CheckinUtils"

        , "com.mondayreplay.api.enduser.Notification"
        , "com.mondayreplay.api.enduser.Place"
        , "com.mondayreplay.api.enduser.Timeline"
        , "com.mondayreplay.api.enduser.Checkin"
        , "com.mondayreplay.api.enduser.Session"
        , "com.mondayreplay.api.enduser.Clip"
        , "com.mondayreplay.api.enduser.Track"
        , "com.mondayreplay.api.enduser.Hashtag"
        , "com.mondayreplay.api.enduser.Highlight"
        , "com.mondayreplay.api.enduser.Friend"
        , "com.mondayreplay.api.enduser.User"
        , "com.mondayreplay.api.enduser.Dropbox"
        
        , "com.mondayreplay.libs.directives.mrSocialShare"
    ]);

})();

