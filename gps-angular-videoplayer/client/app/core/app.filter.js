(function () {
    'use strict';

    var filter = angular.module('app');

    filter.filter('dateFromMillis', function ($filter) {
        return function (input, format) {
            return (input!=null) ? $filter('date')(new Date(input), format) : null ;
        };
    });

    filter.filter('dateFromSeconds', function ($filter) {
        return function (input, format) {
            return (input!=null) ? $filter('date')(new Date(input * 1000), format) : null ;
        };
    });

    filter.filter('dateFromISODATE', function ($filter) {
        return function (input, format) {
            return $filter('date')(Date.parse(input) + (new Date(input).getTimezoneOffset() * 60 * 1000), format);
        };
    });

    filter.filter("formatScore", function () {
        return function (input) {
            return input.toFixed(2);
        };
    });

    filter.filter("othersFilterSerialization", function () {
        return function (value, params) {
            if (params && params.serializer) {
                return params.serializer(value, params.metadata);
            } else {
                return angular.toJson(value, true);
            }
        };
    });

    filter.filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });

    filter.filter('capitalize', function () {
        return function (input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        }
    });

    //from seconds to minute:seconds
    filter.filter("duration", function () {
        return function (input) {
            input = input / 1000;
            var min = Math.floor(input / 60);
            var sec = Math.floor(input - min * 60);
            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
            return min + ":" + sec;
        };
    });

    //sum of duration
    filter.filter("totaltime", function () {
        return function (session) {
            return session.clips.reduce(function (prev, clip) {
                return prev + parseInt(clip.duration);
            }, 0);
        };
    });

    //filter by unique field
    filter.filter("unique", function () {

        return function (arr, field) {
            var o = {}, i,
                l = arr.length,
                r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };
    });
})();
