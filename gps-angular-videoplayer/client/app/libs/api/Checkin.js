/*eslint */
/*global angular */
( function() {
	"use strict";

	angular.module("com.mondayreplay.api.enduser.Checkin", ["ngCookies", "Lib.Services.Config"])
		.factory("Checkin", ["$http", "$cookies", "$q", "Config", function ($http, $cookies, $q, Config) {
			var dataFactory = {};

			dataFactory.newcheckin = function (digest, comment, placeId, sport, condition, friendtags, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/newcheckin",
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
					data: {digest: digest, comment: comment, placeId: placeId, sport: sport, condition: condition, friendtags: friendtags}
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
			
			dataFactory.newcheckinPromise = function (digest, comment, placeId, sport, condition, friendtags) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/newcheckin",
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
					data: {digest: digest, comment: comment, placeId: placeId, sport: sport, condition: condition, friendtags: friendtags}
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
			
			dataFactory.like = function (id, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/like",
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
					data: {id: id}
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
			
			dataFactory.likePromise = function (id) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/like",
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
					data: {id: id}
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
			
			dataFactory.newcomment = function (digest, checkinId, comment, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/newcomment",
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
					data: {digest: digest, checkinId: checkinId, comment: comment}
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
			
			dataFactory.newcommentPromise = function (digest, checkinId, comment) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/newcomment",
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
					data: {digest: digest, checkinId: checkinId, comment: comment}
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
			
			dataFactory.comments = function (checkinId, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/comments",
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
					data: {checkinId: checkinId, start: start, limit: limit}
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
			
			dataFactory.commentsPromise = function (checkinId, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/comments",
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
					data: {checkinId: checkinId, start: start, limit: limit}
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
			
			dataFactory.checkinsByOwnerId = function (ownerId, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/checkinsbyownerid",
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
					data: {ownerId: ownerId, start: start, limit: limit}
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
			
			dataFactory.checkinsByOwnerIdPromise = function (ownerId, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/checkinsbyownerid",
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
					data: {ownerId: ownerId, start: start, limit: limit}
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
			
			dataFactory.checkinsByPlaceId = function (placeId, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/checkinsbyplaceid",
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
					data: {placeId: placeId, start: start, limit: limit}
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
			
			dataFactory.checkinsByPlaceIdPromise = function (placeId, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/checkinsbyplaceid",
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
					data: {placeId: placeId, start: start, limit: limit}
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
			
			dataFactory.checkin = function (id, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/checkin",
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
					data: {id: id}
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
			
			dataFactory.checkinPromise = function (id) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/checkin/checkin",
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
					data: {id: id}
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
