import template from './users.html';
import angular from 'angular';
import './users.scss';

class UsersController {
  constructor($scope, $uibModal, NgTableParams, UsersService, Notify) {
    'ngInject';
    this.name = 'USERS.TITLE';

    this.$uibModal = $uibModal;

    this.UsersService = UsersService;
    this.$notify = Notify;

    this.users = [];
    this.NgTableParams = NgTableParams;

    $scope.$on('updateUsers', () => {
      this.getData(this, true);
    });

    this.getData(this);
  }

  create() {
    this.$uibModal.open({
      component: 'createUserModal'
    });
  };

  remove(userId) {
    this.UsersService.remove(userId)
      .then((result) => {
        this.$notify.success('MESSAGES.USER_REMOVED');
      })
  }

  edit(user) {
    this.$uibModal.open({
      component: 'createUserModal',
      resolve: {
        user: user
      }
    });
  }

  disabled(user, status) {
    user.status = status;
    this.UsersService.update(user)
      .then((result) => {
        this.$notify.success('MESSAGES.USER_STATUS_CHANGED');
      })
  }

  getData(update) {
    this.UsersService.getAll(update).then(result => {
      this.users = result;

      this.tableParams = new this.NgTableParams({
        count: 15,
      }, {
        counts: [],
        dataset:  this.users,
      });
    })
  }
}

let usersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: UsersController
};

let usersModule = angular.module('users', [])
  .component('users', usersComponent)
  .name;

export default usersModule;
