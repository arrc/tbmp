(function(){
	'use strict';

	var Cache = function($http, $q, CacheFactory){
    var o = {};

    var BASEURL = "http://localhost:3000";
    var topicsCache = CacheFactory.get('topicsCache');
    var tagsCache = CacheFactory.get('tagsCache');
    var urlsCache = CacheFactory.get('urlsCache');

    o.getAllCache = function(){
      // topics
      if(!topicsCache.get('topicsKey')){
        $http.get(BASEURL + '/t/topics').then(function(res){
          topicsCache.put('topicsKey', res.data.data);
        }, function(err){
          console.error(err);
        });
      }
      // tags
      if(!tagsCache.get('tagsKey')){
        $http.get(BASEURL + '/t/profile').then(function(res){
          console.log(res);
          tagsCache.put('tagsKey', res.data.data.tags);
        }, function(err){
          console.error(err);
        });
      }
      // urls
      if(!urlsCache.get('urlsKey')){
        $http.get(BASEURL + '/t/urls').then(function(res){
          console.log(res);
          urlsCache.put('urlsKey', res.data.data);
        }, function(err){
          console.error(err);
        });
      }
    };

		o.topicsCache = function(){
			return topicsCache.get('topicsKey');
		};

		o.tagsCache = function(){
			return tagsCache.get('tagsKey');
		};

		o.urlsCache = function(){
			return urlsCache.get('urlsKey');
		};


    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').factory('Cache',[
    '$http',
		'$q',
		'CacheFactory',
		Cache
	]);
})();
