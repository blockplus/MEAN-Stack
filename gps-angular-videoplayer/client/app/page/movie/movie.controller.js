(function () {
    'use strict';

    angular.module('app.movie')
        .controller('movieCtrl', ['$rootScope', '$scope', '$stateParams', '$state', '$filter', 'logger', '$timeout', 'Movie', 'AssetsManager', 'screenSize', 'moviePlaylist', 'VG_UTILS', movieCtrl]);

    function movieCtrl($rootScope, $scope, $stateParams, $state, $filter, logger, $timeout, Movie, AssetsManager, screenSize, moviePlaylist, VG_UTILS) {
        $scope.playlist = moviePlaylist.movies;
        $scope.currentId = $stateParams.currentId || $stateParams.movieId;
        $scope.config = {
            continuePlay: true
        };
        $scope.isMobile = screenSize.is('xs');
        $scope.userIsAuthenticated = $rootScope.isAuthenticated;

        var buildMovieHighlightsTimings = function(movie){
            var lastHLEndMsec = 0;
            for (var j = 0; j < movie.highlights.length; j++) {
                var hl = movie.highlights[j];
                hl._timeStart = lastHLEndMsec;
                hl._timeEnd = lastHLEndMsec = hl._timeStart + hl.duration;
            }
        };

        for (var i = 0; i < $scope.playlist.length; i++) {
            var movie = $scope.playlist[i];
            if (movie.id == $scope.currentId) {
                $scope.movie = movie;
                buildMovieHighlightsTimings($scope.movie);
                break;
            }
        }


        // google analytics tracking
        ga('send', 'pageview', "movie");
        ga('send', 'event', "movie", "watch", $scope.movie.id);

        $scope.onMoviePlayerReady = function (API) {
            $scope.API = API;
        };

        $scope.onCanPlayMovie = function (movie) {
            $("#movie_playlist").scrollTo(document.getElementById(movie.id), 500);
        };

        $scope.onCompleteMovie = function (movie) {
            if ($scope.config.continuePlay) {
                $scope.nextMovie(movie);
                ga('send', 'event', "player", "next_auto", "MOVIE");
            }
        };

        $scope.onMovieClick = function (movie) {
            $scope.setMovie(movie);
            ga('send', 'event', "player", "change", "MOVIE");
        };

        $scope.setMovie = function (movie) {
            $scope.movie = movie;
            buildMovieHighlightsTimings($scope.movie);
            $state.go('movie', {movieId: $stateParams.movieId, currentId: movie.id}, {notify: false});

            ga('send', 'event', "movie", "watch", $scope.movie.id);

            if (VG_UTILS.isMobileDevice()) {
                // trick to autoplay on mobile
                $timeout($scope.API.play.bind($scope.API), 100);
            }
        };

        $scope.onNextClick = function () {
            $scope.nextMovie($scope.movie);
            ga('send', 'event', "player", "next", "MOVIE");
        };

        $scope.onPrevClick = function () {
            $scope.prevMovie($scope.movie);
            ga('send', 'event', "player", "prev", "MOVIE");
        };

        $scope.nextMovie = function (movie) {
            var index = $scope.playlist.findIndex(function (element, index, array) {
                return element.id == movie.id;
            });

            if (index + 1 < $scope.playlist.length) {
                $scope.setMovie($scope.playlist[index + 1]);
            } else {
                index = 0;
                $scope.setMovie($scope.playlist[index]);
            }
        };

        $scope.prevMovie = function (movie) {
            var index = $scope.playlist.findIndex(function (element, index, array) {
                return element.id == movie.id;
            });

            if (index - 1 >= 0) {
                $scope.setMovie($scope.playlist[index - 1]);
            } else {
                index = $scope.playlist.length - 1;
                $scope.setMovie($scope.playlist[index]);
            }
        };

        $scope.like = function () {
            Movie.like($scope.movie.id, function (data) {
                $scope.movie.likes = $scope.movie.likes + 1;
                $scope.movie.liked = true;

                ga('send', 'event', "movie", "like", $scope.session.id);

            }, function (data, status) {
                if (status == 500 && data.exception == "com.mondayreplay.api.commons.CannotPerformOperationAnymore") {
                    logger.logSuccess($filter("translate")("liked_already"));
                } else if (status == 401) {
                    logger.log($filter("translate")("login_to_continue"));
                } else {
                    logger.logError($filter("translate")("no_internet_connection"));
                }
            });
        };

        $scope.placeMap = function (coordinates) {
            return AssetsManager.placeMap({
                latitude: coordinates[1],
                longitude: coordinates[0]
            });
        };

    }
})(); 