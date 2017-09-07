(function () {
    "use strict";

    angular.module('app.privacypolicy')
        .controller('privacypolicyCtrl', [privacypolicyCtrl]);

    function privacypolicyCtrl() {
        // google analytics tracking
        ga("send", "pageview", "privacypolicy");
    }

})(); 