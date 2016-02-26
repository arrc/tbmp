(function() {
  'use strict';
  var app = angular.module('tbmp',['ui.router','PubSub','angular-cache', 'angular-jwt', 'ngNotify', 'ngDialog', 'ngLodash']);
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/main/home.html'
      });
  }]);
}());
