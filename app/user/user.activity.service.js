'use strict';

angular.
module('userActivityServise', [])
  .service('Activity', ['$http', function($http) {
    var self = this;

    self.saveUserActivity =function (id,date,activity) {
        self.userActivity= {id:id, date:date,activity:activity};
        return $http.post('https://userbackend.herokuapp.com/useractivity', JSON.stringify(self.userActivity)).then(function (response) {
          if (response.data)
            self.msg = "Post Data Submitted Successfully!";
        }, function (response) {
          self.msg = "Service not Exists";
          self.statusval = response.status;
          self.statustext = response.statusText;
          self.headers = response.headers();
        });


    }

  }]);
