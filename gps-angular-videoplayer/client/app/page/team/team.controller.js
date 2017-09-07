(function () {
    "use strict";

    angular.module('app.team')
        .controller('teamCtrl', [teamCtrl]);

    function teamCtrl() {
        // google analytics tracking
        ga("send", "pageview", "team");
    }

})(); 