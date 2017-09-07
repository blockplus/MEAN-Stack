/*eslint */
/*global angular */
( function() {
	"use strict";

	angular.module("com.mondayreplay.api.enduser.Session", ["ngCookies", "Lib.Services.Config"])
		.factory("Session", ["$http", "$cookies", "$q", "Config", function ($http, $cookies, $q, Config) {
			var dataFactory = {};

			dataFactory.session = function (id, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/session",
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
			
			dataFactory.sessionPromise = function (id) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/session",
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
			
			dataFactory.sessions = function (start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/sessions",
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
			
			dataFactory.sessionsPromise = function (start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/sessions",
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
			
			dataFactory.sessionsByOwnerId = function (ownerId, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/sessionsbyownerid",
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
			
			dataFactory.sessionsByOwnerIdPromise = function (ownerId, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/sessionsbyownerid",
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
			
			dataFactory.sessionsByPlaceId = function (placeId, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/sessionsbyplaceid",
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
			
			dataFactory.sessionsByPlaceIdPromise = function (placeId, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/sessionsbyplaceid",
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
			
			dataFactory.search = function (text, hashtags, polygon, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/search",
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
					url: Config.API_URL + "/enduser/session/search",
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
			
			dataFactory.like = function (id, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/like",
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
					url: Config.API_URL + "/enduser/session/like",
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
			
			dataFactory.newcomment = function (digest, sessionId, comment, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/newcomment",
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
					data: {digest: digest, sessionId: sessionId, comment: comment}
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
			
			dataFactory.newcommentPromise = function (digest, sessionId, comment) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/newcomment",
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
					data: {digest: digest, sessionId: sessionId, comment: comment}
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
			
			dataFactory.delete = function (id, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/delete",
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
			
			dataFactory.deletePromise = function (id) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/delete",
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
			
			dataFactory.update = function (id, name, description, hashtags, clipsTrackOffset, placeId, friendtags, sport, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/update",
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
					data: {id: id, name: name, description: description, hashtags: hashtags, clipsTrackOffset: clipsTrackOffset, placeId: placeId, friendtags: friendtags, sport: sport}
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
			
			dataFactory.updatePromise = function (id, name, description, hashtags, clipsTrackOffset, placeId, friendtags, sport) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/update",
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
					data: {id: id, name: name, description: description, hashtags: hashtags, clipsTrackOffset: clipsTrackOffset, placeId: placeId, friendtags: friendtags, sport: sport}
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
			
			dataFactory.comments = function (sessionId, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/comments",
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
					data: {sessionId: sessionId, start: start, limit: limit}
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
			
			dataFactory.commentsPromise = function (sessionId, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/session/comments",
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
					data: {sessionId: sessionId, start: start, limit: limit}
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
