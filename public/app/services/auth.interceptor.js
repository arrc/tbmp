(function(){
	'use strict';

	angular.module('tbmp').factory('AuthInterceptor', function ($rootScope, $q, $window, Auth) {
	  return {
		request: function (config) {
			var token = Auth.getToken();
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		},
		responseError: function (rejection) {
		  if (rejection.status === 401) {
			// handle the case where the user is not authenticated
			console.warn('user not authenticated', rejection);
      ngNotify.set('user not authenticated ! ' + rejection, 'error');
		  }
		  return $q.reject(rejection);
		}
	  };
	});

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.interceptors.push('AuthInterceptor');
		}
	]);
})();
