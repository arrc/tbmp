(function() {
  'use strict';
  var app = angular.module('tbmp',['ui.router','PubSub','angular-cache', 'angular-jwt', 'ngNotify', 'ngDialog', 'ngLodash']);

  // Config
  app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider','CacheFactoryProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider, CacheFactoryProvider){
    $locationProvider.html5Mode(false).hashPrefix('!');
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 }); // cache expire after 15 minutes

    // Routes
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/main/home.html'
      });
  }]);

  // Run block
  app.run(['CacheFactory',
    function(CacheFactory){
      CacheFactory("topics", {storageMode: 'localStorage', maxAge: 60 * 60 * 1000, deleteOnExpire: 'aggressive'});
    }]);
}());
