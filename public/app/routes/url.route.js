'use strict';

angular.module('tbmp').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('urls', {
    abstract: true,
    url: '/urls',
    templateUrl: 'app/views/url/url.shell.html'
  })
  .state('urls.list', {
    url: '/list',
    templateUrl: 'app/views/url/url.list.html'
  })
  .state('urls.view', {
    url: '/view/:urlId',
    templateUrl: 'app/views/url/url.single.html'
  })
  .state('urls.new', {
    url: '/new',
    templateUrl: 'app/views/url/url.new.html'
  });
}]);
