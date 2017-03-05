'use strict';

angular.module('userSignIn', []).component('userSignIn', {
  templateUrl: './app/user-sign-in/user-sign-in.template.html',
  controller: ['User', '$location', 'Activity', function UserSignInController(user, $location, activity) {
    var self = this;

    self.singInUser = function (login, password) {
      user.getUser(login, password).then(function (response) {
        self.user = response.data;
        self.clickEvent();
        return $location.url('user/' + self.user.login);
        // return self.user
      }).catch(function (error) {
        alert("Incorrect username or password.");
        self.userLogin = "";
        self.userPassword = "";
      });
    }

    // Event handlers
    self.clickEvent = function () {
      activity.getUserActivity().then(function (response) {
        self.userActivityData = response.data;
        self.id = self.userActivityData.length + 1;
        self.date = new Date().toUTCString();
        self.activity = 'User Sign in';
        activity.saveUserActivity(self.id, self.date, self.activity);
      });
    }
  }]
});
