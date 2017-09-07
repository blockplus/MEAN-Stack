(function () {
    'use strict';

    angular.module('app.layout')
        .directive('toggleNavCollapsedMin', ['$rootScope', toggleNavCollapsedMin])
        .directive('affixNav', ['$window', affixNav])
        .directive('highlightActive', highlightActive)
        .directive("mobileToggleMenu", mobileToggleMenu)
        .directive("mobileCloseMenu", mobileCloseMenu);

    // switch for mini style NAV, realted to 'collapseNav' directive
    function toggleNavCollapsedMin($rootScope) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            var app;

            app = $('#app');

            ele.on('click', function(e) {
                if (app.hasClass('nav-collapsed-min')) {
                    app.removeClass('nav-collapsed-min');
                } else {
                    app.addClass('nav-collapsed-min');
                    $rootScope.$broadcast('nav:reset');
                }
                return e.preventDefault();
            });            
        }
    }

    function affixNav($window) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= elem.parents('body').find('header').height()) {
                    elem.addClass('nav-container-affix');
                } else {
                    elem.removeClass('nav-container-affix');
                }
            });
        }
    }

    // Add 'active' class to li based on url, muli-level supported, jquery free
    function highlightActive() {
        var directive = {
            restrict: 'A',
            controller: [ '$scope', '$element', '$attrs', '$location', toggleNavCollapsedMinCtrl]
        };

        return directive;

        function toggleNavCollapsedMinCtrl($scope, $element, $attrs, $location) {
            var highlightActive, links, path;

            links = $element.find('a');

            path = function() {
                return $location.path();
            };

            highlightActive = function(links, path) {
//                path = '#' + path;    //with html5mode disabled
                return angular.forEach(links, function(link) {
                    var $li, $link, href;
                    $link = angular.element(link);
                    $li = $link.parent('li');
                    href = '/' + $link[0].attributes['ui-sref'].value;
                    if ($li.hasClass('active')) {
                        $li.removeClass('active');
                    }
                    if (path.indexOf(href) === 0) {
                        return $li.addClass('active');
                    }
                });
            };

            highlightActive(links, $location.path());

            $scope.$watch(path, function(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                return highlightActive(links, $location.path());
            });

        }

    }

    // toggle on-canvas for small screen, with CSS
    function mobileToggleMenu() {
        var directive = {
            restrict: "A",
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            ele.on("click", function() {
                return $("#app").toggleClass("on-canvas");
            });
        }
    }

    // toggle on-canvas for small screen, with CSS
    function mobileCloseMenu() {
        var directive = {
            restrict: "A",
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            ele.on("click", function() {
                return $("#app").removeClass("on-canvas");
            });
        }
    }


})(); 



