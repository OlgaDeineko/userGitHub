'use strict';

angular.module('userRepoList', []).component('userRepoList', {
  templateUrl: './app/user-repo-list/user-repo-list.template.html',
  controller: ['User','$routeParams','$location', function UserRepoListController(user, $routeParams,$location) {
    var self = this;
    user.getRepos($routeParams.login).then(function (response) {
      self.repos = response.data;
    });

    user.getUserInfo($routeParams.login).then(function (response) {
      self.user = response.data;
    });

    self.getRepoIssues = function (repo) {
        user.getIssues(repo).then(function (res) {
        self.issues = res.data;
          if(self.issues.length == 0){
            repo.issues =[{title:'No issues!'}];
            console.log(repo.issues);
          }
          else{
            repo.issues = self.issues;
            console.log(repo.issues);
          }

        });
    };

    self.signOut = function () {
      return $location.url('user/');
    }


  }]
});
