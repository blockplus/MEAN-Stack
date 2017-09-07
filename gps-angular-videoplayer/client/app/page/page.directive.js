(function () {
    'use strict';

    angular.module('app.page')
        .directive('customPage', customPage);


    // add class for specific pages to achieve fullscreen, custom background etc.
    function customPage() {
        var directive = {
            restrict: 'A',
            controller: ['$scope', '$element', '$location', customPageCtrl]
        };

        return directive;

        function customPageCtrl($scope, $element, $location) {
            var addBg, path;

            path = function () {
                return $location.path();
            };

            addBg = function (path) {
                $element.removeClass('body-wide body-err body-lock body-auth body-landing');
                switch (path) {
                    case '/404':
                    case '/500':
                        return $element.addClass('body-wide body-err');
                    case '/faq':
                    case '/team':
                    case '/privacypolicy':
                    case '/termsandconditions':
                    case '/about-mondayreplay':
                    case '/about/edit-video':
                    case '/about/upload-dropbox':
                    case '/contactus':
                        return $element.addClass('body-landing');
                    case '/home':
                        return $element.addClass('body-landing body-wide');
                }
            };

            addBg($location.path());

            $scope.$watch(path, function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                return addBg($location.path());
            });
        }
    }

})();


