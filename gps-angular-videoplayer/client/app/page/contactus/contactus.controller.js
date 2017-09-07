(function () {
    "use strict";

    angular.module("app.contactus")
        .controller("contactusCtrl", [contactusCtrl]);

    function contactusCtrl() {
        // google analytics tracking
        ga('send', 'pageview', "contactus");
    }
})();