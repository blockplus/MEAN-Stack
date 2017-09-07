(function () {
    'use strict';

    angular.module('app.layout')
        .directive('uiPreloader', ['$rootScope', uiPreloader])
        .directive('togglePageFilter', ['$rootScope', '$document', togglePageFilter]);

    function uiPreloader($rootScope) {
        return {
            restrict: 'A',
            template:'<span class="bar"></span>',
            link: function(scope, el, attrs) {        
                el.addClass('preloaderbar hide');
                scope.$on('$stateChangeStart', function(event) {
                    el.removeClass('hide').addClass('active');
                });
                scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        el.addClass('hide').removeClass('active');
                    })
                });

                scope.$on('preloader:active', function(event) {
                    el.removeClass('hide').addClass('active');
                });
                scope.$on('preloader:hide', function(event) {
                    el.addClass('hide').removeClass('active');
                });                
            }
        };        
    }

    // toggle page-filter-open class in main-container
    function togglePageFilter($rootScope, $document) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                var onClick = function() {
                    var wasOpen = $('.main-container').hasClass('page-filters-open');
                    $('.main-container').toggleClass('page-filters-open');
                    $('.page-filters').toggleClass('page-filters-open');
                    $('.main-container-mask').toggleClass('page-filters-open');
                    $('.app').toggleClass('page-filters-open');
                    $rootScope.$broadcast('pagefilters:' + (wasOpen ? 'close' : 'open'));
                    $document.scrollTo(0, 0);
                };

                scope.$on('pagefilters:force-close', function(event) {
                    var wasOpen = $('.main-container').hasClass('page-filters-open');
                    if(wasOpen){
                        onClick();
                    }
                });

                el.on('click', onClick);
            }
        };
    }
})(); 

