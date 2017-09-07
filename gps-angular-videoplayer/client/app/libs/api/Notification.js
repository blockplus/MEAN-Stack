/*eslint */
/*global angular */
( function() {
	"use strict";

	angular.module("com.mondayreplay.api.enduser.Notification", ["ngCookies", "Lib.Services.Config"])
		.factory("Notification", ["$http", "$cookies", "$q", "Config", function ($http, $cookies, $q, Config) {
			var dataFactory = {};

			dataFactory.notification = function (id, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/notification",
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
			
			dataFactory.notificationPromise = function (id) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/notification",
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
			
			dataFactory.notifications = function (start, limit, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/notifications",
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
			
			dataFactory.notificationsPromise = function (start, limit) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/notifications",
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
			
			dataFactory.count = function (output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/count",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
					},
					data: {}
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
			
			dataFactory.countPromise = function () {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/count",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
					},
					data: {}
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
			
			dataFactory.clearCount = function (output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/clearcount",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
					},
					data: {}
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
			
			dataFactory.clearCountPromise = function () {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/clearcount",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
					},
					data: {}
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
			
			dataFactory.markAsRead = function (id, output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/markasread",
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
			
			dataFactory.markAsReadPromise = function (id) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/markasread",
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
			
			dataFactory.markAllAsRead = function (output, error) {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/markallasread",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
					},
					data: {}
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
			
			dataFactory.markAllAsReadPromise = function () {
				var req = {
					method: "POST",
					url: Config.API_URL + "/enduser/notification/markallasread",
					headers: {
						"X-CLIENT-TYPE" : "AngularJS"
						,"X-CLIENT-VERSION" : "1.10.0"
						,"X-CLIENT-VERSION-CODE" : "1"
						,"X-APP-NAME" : Config.APP_NAME
						,"X-APP-VERSION" : Config.APP_VERSION
						,"X-DEVICE-ID" : $cookies.get(Config.DEVICE_ID_COOKIE)
						,"X-AUTH-TOKEN": $cookies.get(Config.AUTH_TOKEN_COOKIE)
					},
					data: {}
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
