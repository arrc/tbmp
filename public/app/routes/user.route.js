'use strict';

angular.module('tbmp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/user/login.html'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/user/signup.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'app/views/user/profile.html'
  });
}]);
