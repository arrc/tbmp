(function() {
  'use strict';
	var UrlCtrl = function($http, $state, $stateParams, $window, ngNotify, Url){
		var _this = this;
    _this.urls = [];
    _this.url = {};

// save url
    _this.saveUrl = function(){
      Url.saveUrl(_this.urlFormData).then(function(data){
        _this.results = data;
      }, function(error){
        console.log(error);
        ngNotify(error.message);
      });
    };

// retrive urls
    _this.retriveUrls = function(){
      Url.retriveUrls().then(function(data){
        _this.urls = data;
      }, function(error){
        console.error(error);
      });
    };

// retrive single url
    _this.retriveUrl = function(){
      Url.retriveUrl($stateParams.urlId).then(function(data){
        _this.url = data;
      }, function(error){
        console.error(error);
      });
    };

// delete url
    _this.deleteUrl = function(url){
      var index = _this.urls.indexOf(url);
      Url.deleteUrl(url._id).then(function(){
        _this.urls.splice(index, 1);
        ngNotify.set('Url deleted successfully ', 'error');
      }, function(error){
        console.error(error);
      });
    };


	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').controller('UrlCtrl',[
		'$http',
    '$state',
    '$stateParams',
    '$window',
    'ngNotify',
    'Url',
    UrlCtrl
	]);
})();
