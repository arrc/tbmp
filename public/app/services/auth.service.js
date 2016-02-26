(function(){
	'use strict';

	var Auth = function($q, $window, jwtHelper){
		var tokenKey = 'auth-token';
		var storage = $window.localStorage;
		var decodedUser;
		var cachedToken;

		/* ==========================================================
			set token
		============================================================ */
		function setToken(token) {
			cachedToken = token;
			storage.setItem(tokenKey, token);
		}

		/* ==========================================================
			get token
		============================================================ */
		function getToken() {
			if (!cachedToken) {
				cachedToken = storage.getItem(tokenKey);
			}
			return cachedToken;
		}

		/* ==========================================================
			clear token
		============================================================ */
		function clearToken() {
			cachedToken = null;
			storage.removeItem(tokenKey);
		}

		/* ==========================================================
			decoded user
		============================================================ */
		function user() {
			if (!cachedToken) { return 'Not logged in'; }
			decodedUser = jwtHelper.decodeToken(cachedToken);
			return decodedUser;
		}

		/* ==========================================================
			authentication switch
		============================================================ */
		function isAuthenticated() {
			return !!getToken();
		}

		return {
			isAuthenticated: isAuthenticated,
			setToken: setToken,
			getToken: getToken,
			clearToken: clearToken,
			user: user
		};

	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').factory('Auth',[
		'$q',
		'$window',
		'jwtHelper',
		Auth
	]);
})();
