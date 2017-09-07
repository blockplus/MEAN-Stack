/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.AssetsManager", ["Lib.Services.Config"])
        .factory("AssetsManager", ["Config", function (Config) {
            var dataFactory = {};

            //dataFactory.sessionThumbnail = function (session) {
            //    return Config.DS_URL + "/assets/sessions/" + session.id + "/thumbnail";
            //};

            dataFactory.sessionThumbnail = function (session, index) {
                return Config.DS_URL + "/assets/sessions/" + session.id + "/thumbnail?index=" + index;
            };

            dataFactory.clipThumbnail = function (clip) {
                return Config.DS_URL + "/assets/sessions/" + clip.sessionId + "/clips/" + clip.id + "/thumbnail";
            };

            dataFactory.clipSprite = function (clip) {
                return Config.DS_URL + "/assets/sessions/" + clip.sessionId + "/clips/" + clip.id + "/sprite";
            };

            dataFactory.highlightThumbnail = function (highlight) {
                return Config.DS_URL + "/assets/sessions/" + highlight.sessionId + "/clips/" + highlight.clipId + "/highlights/" + highlight.id + "/thumbnail";
            };

            dataFactory.clipVideo = function (clip) {
                //return Config.DS_URL + "/assets/sessions/" + clip.sessionId + "/clips/" + clip.id + "/video";
                return Config.CDN_URL + "/sessions/" + clip.sessionId + "/clips/" + clip.id + "/video_640.mp4";
            };

            dataFactory.highlightVideo = function (highlight) {
                //return Config.DS_URL + "/assets/sessions/" + highlight.sessionId + "/clips/" + highlight.clipId + "/highlights/" + highlight.id + "/video";
                return Config.CDN_URL + "/sessions/" + highlight.sessionId + "/clips/" + highlight.clipId + "/highlights/" + highlight.id + "/video_640.mp4";
            };

            dataFactory.highlightClipVideo = function (highlight) {
                //return Config.DS_URL + "/assets/sessions/" + highlight.sessionId + "/clips/" + highlight.clipId + "/video";
                return Config.CDN_URL + "/sessions/" + highlight.sessionId + "/clips/" + highlight.clipId + "/video_640.mp4";
            };

            dataFactory.trackGeojsonCP = function (track) {
                return Config.CDN_URL + "/sessions/" + track.sessionId + "/tracks/" + track.id + "/geojsoncp.json";
                //return Config.DS_URL + "/assets/sessions/" + track.sessionId + "/tracks/" + track.id + "/geojsoncp";
            };

            dataFactory.placeMap = function (point) {
                return "http://staticmap.openstreetmap.de/staticmap.php?center=" + point.latitude + "," + point.longitude + "&zoom=20&size=865x512&maptype=mapnik&markers=" + point.latitude + "," + point.longitude + ",lightblue1";
            };

            dataFactory.clipFrame = function (clip, millisecondPosition) {
                return Config.DS_URL + "/assets/sessions/" + clip.sessionId + "/clips/" + clip.id + "/frame?position=" + millisecondPosition;
            };

            dataFactory.movieVideo = function (movie) {
                //return Config.DS_URL + "/assets/movies/" + movie.id + "/video";
                return Config.CDN_URL + "/movies/" + movie.id + "/video_640.mp4";
            };

            dataFactory.movieThumbnail = function (movie) {
                return dataFactory.highlightThumbnail(movie.highlights[0]);
            };

            return dataFactory;
        }
        ]);
})();
