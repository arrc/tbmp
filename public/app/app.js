(function() {
  'use strict';
  var app = angular.module('tbmp',['ui.router','PubSub','angular-cache',
  'angular-jwt', 'ngNotify', 'ngDialog', 'ngLodash', 'angucomplete-alt', 'ngTagsInput']);

  // Config
  app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider','CacheFactoryProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider, CacheFactoryProvider){
    $locationProvider.html5Mode(false).hashPrefix('!');
    angular.extend(CacheFactoryProvider.defaults, { storagePrefix: 'tbmp.', maxAge: 150 * 600 * 10000 , deleteOnExpire: 'aggressive' });

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
      CacheFactory("topicsCache", {storageMode: 'localStorage'});
      CacheFactory("tagsCache", {storageMode: 'localStorage'});
      CacheFactory("urlsCache", {storageMode: 'localStorage'});
    }]);
}());
