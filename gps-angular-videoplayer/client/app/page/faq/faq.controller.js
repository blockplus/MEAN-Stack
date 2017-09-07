(function () {
    "use strict";

    angular.module("app.faq")
        .controller("faqCtrl", [faqCtrl]);

    function faqCtrl() {
        // google analytics tracking
        ga('send', 'pageview', "faq");
    }
})();