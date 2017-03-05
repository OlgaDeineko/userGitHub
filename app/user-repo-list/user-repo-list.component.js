'use strict';

angular.module('userRepoList', []).component('userRepoList', {
  templateUrl: './app/user-repo-list/user-repo-list.template.html',
  controller: ['User', '$routeParams', '$location', 'Activity', function UserRepoListController(user, $routeParams, $location, activity) {
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
        if (self.issues.length == 0) {
          repo.issues = [{title: 'No issues!'}];
        }
        else {
          repo.issues = self.issues;
        }

      });
    };

    self.signOut = function () {
      return $location.url('user/');
    }

// Event handlers
    self.EventHandlers = function (act) {
      activity.getUserActivity().then(function (response) {
        self.userActivityData = response.data;
        self.id = self.userActivityData.length + 1;
        self.date = new Date().toUTCString();
        self.activity = act;
        activity.saveUserActivity(self.id, self.date, self.activity);
      });
    }
  }]
});
