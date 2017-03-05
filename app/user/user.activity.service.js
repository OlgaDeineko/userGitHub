'use strict';

angular.module('userActivityServise', [])
  .service('Activity', ['$http', function ($http) {
    var self = this;

    self.saveUserActivity = function (id, date, activity) {
      self.userActivity = {id: id, date: date, activity: activity};
      console.log(self.userActivity);
      return $http.post('https://userbackend.herokuapp.com/useractivity', JSON.stringify(self.userActivity)).then(function (response) {
        if (response.data)
          self.msg = "Post Data Submitted Successfully!";
        console.log(self.msg);
      }, function (response) {
        self.msg = "Service not Exists";
        console.log(self.msg);
      });
    }

    self.getUserActivity = function () {
      return $http.get('https://userbackend.herokuapp.com')
    }

  }]);
