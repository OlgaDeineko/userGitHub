'use strict';

angular.module('userSignIn', []).component('userSignIn', {
  templateUrl: './app/user-sign-in/user-sign-in.template.html',
  controller: ['User','$location', function UserSignInController(user,$location) {
    var self = this;
    self.singInUser = function (login,password) {
      user.getUser(login,password).then(function (response) {
        self.user = response.data;
        return $location.url('user/'+self.user.login);
        // return self.user
      }).catch( function (error) {
        alert("Incorrect username or password.");
        self.userLogin = "";
        self.userPassword = "";
      });
    }
  }]
});
