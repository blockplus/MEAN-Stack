(function () {
    'use strict';

    angular.module('app.ui')
        .factory('logger', logger)
        .factory('digestlog', digestlog)
        .factory('utils', ['$rootScope', '$timeout', '$filter', utils]);

    function digestlog() {
        return {
            watchDigest: function(scope){
                var input = angular.element(document.getElementById("digestlog"));
                if(input){
                    var digest = 0;
                    input.val(digest);
                    scope.$watch(function () {
                        digest++;
                        // don't use angular to update ui
                        // to prevent interferring with digest
                        // through adding another watch
                        // and to prevent a digest loop.
                        input.val(digest);
                    });
                }
            }
        }
    };

    function logger() {

        var logIt;

        // toastr setting.
        toastr.options = {
            "closeButton": true,
            "positionClass": "toast-bottom-right",
            "timeOut": "3000"
        };

        logIt = function (message, type, options) {
            return angular.extend(toastr[type](message), options);
        };

        return {
            log: function (message, options) {
                logIt(message, 'info', options);
            },
            logWarning: function (message, options) {
                logIt(message, 'warning', options);
            },
            logSuccess: function (message, options) {
                logIt(message, 'success', options);
            },
            logError: function (message, options) {
                logIt(message, 'error', options);
            }
        };

    };

    function utils($rootScope, $timeout, $filter) {
        var utils = {};

        utils.toggleInfiniteScrolling = function(scrollableSection, nextPageData){
            if(scrollableSection.busy){
                $timeout(function(){
                    scrollableSection.busy = false;
                },250);
                scrollableSection.disabled = false;
                $rootScope.$broadcast('preloader:hide');
                if(nextPageData!=null && nextPageData.length < scrollableSection.limit){
                    scrollableSection.disabled = true;
                }
            }else{
                scrollableSection.busy = true;
                scrollableSection.disabled = true;
                $rootScope.$broadcast('preloader:active');
            }
        };

        utils.isSameDay = function(date1, date2){
            return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
        };

        utils.timeSince = function(date) {

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " "+$filter('translate')("date_years") + " " + $filter('translate')("date_ago");
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " "+$filter('translate')("date_months") + " " + $filter('translate')("date_ago");
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " "+$filter('translate')("date_days") + " " + $filter('translate')("date_ago");
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                return interval + " "+$filter('translate')("date_hours") + " " + $filter('translate')("date_ago");
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " "+$filter('translate')("date_minutes") + " " + $filter('translate')("date_ago");
            }
            return Math.floor(seconds) + " "+$filter('translate')("date_seconds") + " " + $filter('translate')("date_ago");
        };

        return utils;
    };

})(); 