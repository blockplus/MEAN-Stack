(function () {
    "use strict";

    angular.module("app")
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $locationProvider.html5Mode({
                    enabled: true
                });

                // ROUTING MANAGEMENT
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state("404", {
                        url: "/404",
                        templateUrl: "app/page/error/404.html"
                    })
                    .state("500", {
                        url: "/500",
                        templateUrl: "app/page/error/500.html"
                    })
                    .state("root", {
                        url: "/",
                        controller: "rootCtrl"
                    })
                    .state("userfeed", {
                        url: "/userfeed",
                        templateUrl: "app/page/userfeed/userfeed.html",
                        controller: "userfeedCtrl",
                        resolve: {
                            userProfile: function (UserManager) {
                                return UserManager.getUserProfile();
                            }
                        }
                    })
                    .state("user", {
                        url: "/users/:userId",
                        templateUrl: "app/page/user/user.html",
                        controller: "userCtrl",
                        resolve: {
                            userSelected: function ($stateParams, User) {
                                return User.profilePromise($stateParams.userId);
                            }
                        }
                    })
                    .state("user_subsection", {
                        url: "/users/:userId/:subsection",
                        templateUrl: "app/page/user/user.html",
                        controller: "userCtrl",
                        resolve: {
                            userSelected: function ($stateParams, User) {
                                return User.profilePromise($stateParams.userId);
                            }
                        }
                    })
                    .state("worldfeed", {
                        url: "/worldfeed",
                        templateUrl: "app/page/worldfeed/worldfeed.html",
                        controller: "worldfeedCtrl"
                    })
                    .state("startnow", {
                        url: "/startnow",
                        templateUrl: "app/page/worldfeed/worldfeed.html",
                        controller: "worldfeedCtrl"
                    })
                    .state("highlight", {
                        url: "/highlights/:highlightId?currentId",
                        templateUrl: "app/page/highlight/highlight.html",
                        controller: "highlightCtrl",
                        resolve: {
                            highlightPlaylist: function ($stateParams, Highlight) {
                                return Highlight.playlistPromise($stateParams.highlightId, 0, 0);
                            }
                        }
                    })
                    .state("movie", {
                        url: "/movies/:movieId?currentId",
                        templateUrl: "app/page/movie/movie.html",
                        controller: "movieCtrl",
                        resolve: {
                            moviePlaylist: function ($stateParams, Movie) {
                                return Movie.playlistPromise($stateParams.movieId, 0, 0);
                            }
                        }
                    })
                    .state("session", {
                        url: "/sessions/:sessionId?clipId",
                        templateUrl: "app/page/session/session.html",
                        controller: "sessionCtrl",
                        resolve: {
                            session: function ($stateParams, Session) {
                                return Session.sessionPromise($stateParams.sessionId);
                            },
                            clipPlaylist: function ($stateParams, Clip) {
                                return Clip.clipsBySessionIdPromise($stateParams.sessionId, 0, 0);
                            }
                        }
                    })
                    .state("editsession", {
                        url: "/sessions/:sessionId/edit",
                        templateUrl: "app/page/editsession/editsession.html",
                        controller: "editsessionCtrl",
                        resolve: {
                            userProfile: function (UserManager) {
                                return UserManager.getUserProfile();
                            },
                            session: function ($stateParams, Session) {
                                return Session.sessionPromise($stateParams.sessionId);
                            }
                        }
                    })
                    .state("place", {
                        url: "/places/:placeId",
                        templateUrl: "app/page/place/place.html",
                        controller: "placeCtrl",
                        resolve: {
                            place: function ($stateParams, Place) {
                                return Place.placePromise($stateParams.placeId);
                            }
                        }
                    })
                    .state("upload", {
                        url: "/upload",
                        templateUrl: "app/page/upload/upload.html",
                        controller: "uploadCtrl",
                        resolve: {
                            userProfile: function (UserManager) {
                                return UserManager.getUserProfile();
                            }
                        }
                    })
                    .state("editmovie", {
                        url: "/edit",
                        templateUrl: "app/page/editmovie/editmovie.html",
                        controller: "editmovieCtrl",
                        resolve: {
                            userProfile: function (UserManager) {
                                return UserManager.getUserProfile();
                            }
                        }
                    })
                    .state("explore", {
                        url: "/explore",
                        templateUrl: "app/page/explore/explore.html",
                        controller: "exploreCtrl"
                    })
                    .state("faq", {
                        url: "/faq",
                        templateUrl: "app/page/faq/faq.html",
                        controller: "faqCtrl"
                    })
                    .state("contactus", {
                        url: "/contactus",
                        templateUrl: "app/page/contactus/contactus.html",
                        controller: "contactusCtrl"
                    })
                    .state("about", {
                        url: "/about-mondayreplay",
                        templateUrl: "app/page/about/about.html",
                        controller: "aboutCtrl"
                    })
                    .state("about_editvideo", {
                        url: "/about/edit-video",
                        templateUrl: "app/page/about/about_editvideo.html",
                        controller: "aboutEditVideoCtrl"
                    })
                    .state("about_uploaddropbox", {
                        url: "/about/upload-dropbox",
                        templateUrl: "app/page/about/about_uploaddropbox.html",
                        controller: "aboutUploadDropboxCtrl"
                    })
                    .state("contest0", {
                        url: "/contest0",
                        templateUrl: "app/page/contest0/contest0.html",
                        controller: "contest0Ctrl"
                    })
                    .state("contest1", {
                        url: "/contest1",
                        templateUrl: "app/page/contest1/contest1.html",
                        controller: "contest1Ctrl"
                    })
                    .state("privacypolicy", {
                        url: "/privacypolicy",
                        templateUrl: "app/page/privacypolicy/privacypolicy.html",
                        controller: "privacypolicyCtrl"
                    })
                    .state("termsandconditions", {
                        url: "/termsandconditions",
                        templateUrl: "app/page/termsandconditions/termsandconditions.html",
                        controller: "termsandconditionsCtrl"
                    })
                    .state("team", {
                        url: "/team",
                        templateUrl: "app/page/team/team.html",
                        controller: "teamCtrl"
                    })
                    .state("home", {
                        url: "/home",
                        templateUrl: "app/page/home/home.html",
                        controller: "homeCtrl"
                    })
                ;
            }
        );

})();
