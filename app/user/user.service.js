'use strict';

angular.module('userServise', [])
  .service('User', ['$http', function ($http) {
    var self = this;
    self.getUser = function (email, password) {
      self.authorization = window.btoa(email + ':' + password);
      return $http.get('https://api.github.com/user', {
        method: 'GET',
        headers: {
          "Authorization": 'Basic ' + self.authorization
        }
      });
    }

    self.getRepos = function (login) {
      return $http.get('https://api.github.com/users/' + login + '/repos')
    }

    self.getIssues = function (repo) {
      return $http.get('https://api.github.com/repos/' + repo.owner.login + '/' + repo.name + '/issues')
    }

    self.getUserInfo = function (login) {
      return $http.get('https://api.github.com/users/' + login)
    }
  }]);
