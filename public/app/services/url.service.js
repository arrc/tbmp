(function(){
	'use strict';

	var Url = function($http, $q, lodash, Cache){
    var o = {};

		// save url
		o.saveUrl = function(urlFormData){console.log('saveurl');
			var payload = prepareUrlForSaving(urlFormData);
			console.log(payload);
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

// Prepare url for saving into database.
		var prepareUrlForSaving = function(urlFormData){
			console.log(urlFormData);
			var payload = {
		    url: urlFormData.url,
		    title: urlFormData.title,
		    favIconUrl: urlFormData.favIconUrl,
		    description: urlFormData.description
		  };

		// TOPICS
			if(!lodash.isEmpty(urlFormData.selectedTopic)){
				var selectedTopic = urlFormData.selectedTopic.originalObject;
	      if(lodash.isObject(selectedTopic)){
	        payload.topic = {new: false, topicName: selectedTopic.name , topicId: selectedTopic._id};
	      } else if (lodash.isString(selectedTopic)){
	        payload.topic = {new: true, topicName: selectedTopic};
	      }
			}


		// TAGS
      if(!lodash.isEmpty(urlFormData.selectedTags)){
				var mappedTags = lodash.map(urlFormData.selectedTags, "text");
	      var oldTags = [];
	      var newTags = [];
	      mappedTags.forEach(function(_i){
	        if(lodash.includes(Cache.tagsCache(), _i)){
	          oldTags.push(_i);
	        } else {
	          newTags.push(_i);
	        }
	      });
	      payload.tags = { old: oldTags, new: newTags};
			}

			return payload;
		};

    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').factory('Url',[
    '$http',
		'$q',
		'lodash',
		'Cache',
		Url
	]);
})();
