(function () {
    'use strict';

    angular.module('app.movie', [
        'matchMedia'
        ,'com.mondayreplay.libs.directives.mrMoviePlaylist'
        , 'com.mondayreplay.libs.directives.mrMoviePlayer'
    ]);
})();