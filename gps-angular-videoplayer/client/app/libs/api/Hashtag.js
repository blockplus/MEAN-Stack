/*eslint */
/*global angular */
( function() {
	"use strict";

	angular.module("com.mondayreplay.api.enduser.Hashtag", ["ngCookies", "Lib.Services.Config"])
		.factory("Hashtag", ["$http", "$cookies", "$q", "Config", function ($http, $cookies, $q, Config) {
			var dataFactory = {};

			dataFactory.hashtags = function (start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/hashtag/hashtags",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
						,"Content-Type": "application/json"
					},
					data: {start: start, limit: limit}
				};

				$http(req).then(
					function (response) {
						if (output && angular.isFunction(output)) {
							output(response.data);
						}
					}, function (response) {
						if (error && angular.isFunction(error)) {
							error(response.data, response.status);
						}
					}
				);
			};
			
			dataFactory.hashtagsPromise = function (start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/hashtag/hashtags",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
						,"Content-Type": "application/json"
					},
					data: {start: start, limit: limit}
				};
				
				var deferred = $q.defer();

				$http(req).then(
					function (response) {
						deferred.resolve(response.data);
					}, function (response) {
						deferred.reject({data: response.data, status: response.status});
					}
				);
				
				return deferred.promise;
			};
			
			dataFactory.search = function (text, hashtags, polygon, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/hashtag/search",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
						,"Content-Type": "application/json"
					},
					data: {text: text, hashtags: hashtags, polygon: polygon, start: start, limit: limit}
				};

				$http(req).then(
					function (response) {
						if (output && angular.isFunction(output)) {
							output(response.data);
						}
					}, function (response) {
						if (error && angular.isFunction(error)) {
							error(response.data, response.status);
						}
					}
				);
			};
			
			dataFactory.searchPromise = function (text, hashtags, polygon, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/hashtag/search",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
						,"Content-Type": "application/json"
					},
					data: {text: text, hashtags: hashtags, polygon: polygon, start: start, limit: limit}
				};
				
				var deferred = $q.defer();

				$http(req).then(
					function (response) {
						deferred.resolve(response.data);
					}, function (response) {
						deferred.reject({data: response.data, status: response.status});
					}
				);
				
				return deferred.promise;
			};
			
			return dataFactory;
		}
	]);
} )();
