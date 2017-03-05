'use strict';

angular.
module('UserGitHubApp').
config(['$locationProvider' ,'$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
    when('/user', {
      template: '<user-sign-in></user-sign-in>'
    }).
    when('/user/:login', {
      template: '<user-repo-list></user-repo-list>'
    }).
    otherwise('/user');
  }
]);
