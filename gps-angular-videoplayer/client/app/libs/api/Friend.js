/*eslint */
/*global angular */
( function() {
	"use strict";

	angular.module("com.mondayreplay.api.enduser.Friend", ["ngCookies", "Lib.Services.Config"])
		.factory("Friend", ["$http", "$cookies", "$q", "Config", function ($http, $cookies, $q, Config) {
			var dataFactory = {};

			dataFactory.friendsByUserId = function (userId, start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/friendsbyuserid",
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
					data: {userId: userId, start: start, limit: limit}
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
			
			dataFactory.friendsByUserIdPromise = function (userId, start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/friendsbyuserid",
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
					data: {userId: userId, start: start, limit: limit}
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
			
			dataFactory.status = function (friendId, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/status",
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
					data: {friendId: friendId}
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
			
			dataFactory.statusPromise = function (friendId) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/status",
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
					data: {friendId: friendId}
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
			
			dataFactory.pendingFriendshipRequest = function (start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/pendingfriendshiprequest",
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
			
			dataFactory.pendingFriendshipRequestPromise = function (start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/pendingfriendshiprequest",
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
			
			dataFactory.deleteFriendship = function (friendId, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/deletefriendship",
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
					data: {friendId: friendId}
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
			
			dataFactory.deleteFriendshipPromise = function (friendId) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/deletefriendship",
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
					data: {friendId: friendId}
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
			
			dataFactory.requestFriendship = function (friendId, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/requestfriendship",
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
					data: {friendId: friendId}
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
			
			dataFactory.requestFriendshipPromise = function (friendId) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/requestfriendship",
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
					data: {friendId: friendId}
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
			
			dataFactory.acceptFriendship = function (friendId, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/acceptfriendship",
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
					data: {friendId: friendId}
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
			
			dataFactory.acceptFriendshipPromise = function (friendId) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/friend/acceptfriendship",
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
					data: {friendId: friendId}
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
