exports.GoogleBooksApi = GoogleBooksApi;

var GoogleClientLogin = require('googleclientlogin').GoogleClientLogin;
var restler = require('restler');

function GoogleBooksApi(email, password, apiKey) {
	this.googleAuth = new GoogleClientLogin({
		email: email,
		password: password,
		service: GoogleClientLogin.services.book,
		accountType: GoogleClientLogin.accountTypes.google
	});
	this.options = { apiKey: apiKey };
}

GoogleBooksApi.prototype = {
	Login: function(onSuccess, onFailure, onCaptchaRequest) {
		var self = this;
		self.googleAuth.on(GoogleClientLogin.events.login, function(){
			onSuccess();
		});
		self.googleAuth.on(GoogleClientLogin.events.error, function(e) {
			switch(e.message) {
				case GoogleClientLogin.errors.loginFailed:
					if (this.isCaptchaRequired()) {
						onCaptchaRequest(this.getCaptchaUrl(), this.getCaptchaToken());
					} else {
						if (typeof onFailure !== "undefined") {
							onFailure();
						}
						self.Login(onSuccess, onFailure, onCaptchaRequest);
					}
					break;
				case GoogleClientLogin.errors.tokenMissing:
				case GoogleClientLogin.errors.captchaMissing:
					throw new Error('You must pass the both captcha token and the captcha')
					break;
			}
			throw new Error('Unknown error');
		});
		self.googleAuth.login();
	},
	RetrieveBookshelfList : function (callback) {
		var options = (this.options || { });
		return this._sendRequest('get','https://www.googleapis.com/books/v1/mylibrary/bookshelves', options, null, callback);
	},
	RetrieveBooksOnShelf: function (shelfId, callback) {
		var options = (this.options || { });
		return this._sendRequest('get','https://www.googleapis.com/books/v1/mylibrary/bookshelves/' + shelfId + '/volumes', options, null, callback);
	},
	_sendRequest: function(type, url, option, body, callback) {
		var self = this;
		if((callback === null || callback === undefined) && body !== null) {
			callback = body;
			body = null;
		}

		if((callback === null || callback === undefined) && option !== null) {
			callback = option;
			option = null;
		}

		if(body && typeof body == 'object'){
			body = JSON.stringify(body)
		}
		  
		if (self.googleAuth.getAuthId() === undefined)
		{
			throw 'Try to login first';
		}
		  
		callback = callback || function(){};
		option = option || {};
		  
		var restRequest = null;
		var requestOption = { query : option, parser : restler.parsers.json };
		requestOption.headers = {};
		requestOption.headers['Authorization'] = 'GoogleLogin auth=' + self.googleAuth.getAuthId();
		if (body) {
			requestOption.data = body;
			requestOption.headers['content-type'] = 'application/json';
		}
		  
		switch(type.toLowerCase()){			
			case 'post': restRequest = restler.post(url, requestOption);
			  break;
			default : restRequest = restler.get(url, requestOption);
		}
		  

		restRequest.on('complete', function(result, response ) {
			if(result instanceof Error || response.statusCode != 200){
				callback(result, response);
			}
			return callback(result, response);
		});
	}
};