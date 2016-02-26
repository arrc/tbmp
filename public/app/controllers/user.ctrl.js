(function() {
  'use strict';
	var UserCtrl = function($http, User){
		var _this = this;
    _this.user = {};
    User.profile().then(function(data){
      console.log(data);
      _this.user = data;
    }, function(error){
      console.error(error);
    });
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('tbmp').controller('UserCtrl',[
		'$http',
    'User',
		UserCtrl
	]);
})();
