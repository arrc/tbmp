(function(){
	'use strict';

	var Url = function($http, $q){
    var o = {};

		// save url
		o.saveUrl = function(urlFormData){
			var dfd = $q.defer();
			$http.post('/api/urls', urlFormData)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive urls
		o.retriveUrls = function(){
			var dfd = $q.defer();
			$http.get('/api/urls')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive single url
		o.retriveUrl = function(urlId){
			var dfd = $q.defer();
			$http.get('/api/urls/' + urlId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

    // edit url
    o.editUrl = function(url){
      var dfd = $q.defer();
      $http.put('/api/urls' + url._id, url)
        .success(function(res){
          dfd.resolve(res.data);
        })
        .error(function(error){
          dfd.reject(error);
        });
      return dfd.promise;
    };

		// delete url
		o.deleteUrl = function(urlId){
			var dfd = $q.defer();
			$http.delete('/api/urls/' + urlId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').factory('Url',[
    '$http',
		'$q',
		Url
	]);
})();
