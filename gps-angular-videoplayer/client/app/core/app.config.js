(function () {
    'use strict';

    angular.module('app.core')
        .factory('appConfig', [appConfig])
        .config(coreConfig);

    function appConfig() {

        _.templateSettings = {
            interpolate: /\{(.+?)\}/g
        };

        var pageTransitionOpts = [
            {
                name: 'Fade up',
                "class": 'animate-fade-up'
            }, {
                name: 'Scale up',
                "class": 'ainmate-scale-up'
            }, {
                name: 'Slide in from right',
                "class": 'ainmate-slide-in-right'
            }, {
                name: 'Flip Y',
                "class": 'animate-flip-y'
            }
        ];

        var main = {
            brand: "MondayReplay",
            layout: "wide",                                 // "boxed", "wide"
            isMenuCollapsed: true,                          // true, false
            fixedHeader: true,                              // true, false
            fixedSidebar: true,                             // true, false
            pageTransition: pageTransitionOpts[0]          // 0, 1, 2, 3... and build your own5,26; 31,32,33,34,35,36
        };

        return {
            main: main
        }
    }

    function coreConfig($mdThemingProvider) {
        // Extend the red theme with a few different colors
        var mrBlueMap = $mdThemingProvider.extendPalette('blue', {
            '500': '0F72B5',
        });

        var mrRedMap = $mdThemingProvider.extendPalette('red', {
            'A200': 'DA322C'
        });


        // Register the new color palette map with the name <code>mrBlueMap</code>
        $mdThemingProvider.definePalette('mrBlueMap', mrBlueMap);

        // Register the new color palette map with the name <code>mrRedMap</code>
        $mdThemingProvider.definePalette('mrRedMap', mrRedMap);

        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
            .primaryPalette('mrBlueMap', {
                'default': '500'
            })
            .accentPalette('mrRedMap', {
                'default': 'A200'
            })
            .warnPalette('mrRedMap', {
                'default': 'A200'
            })
    }

})();