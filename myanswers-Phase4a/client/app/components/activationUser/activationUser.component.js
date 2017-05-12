import template from './activationUser.html';
import angular from 'angular';
import './activationUser.scss';

class ActivationUserController {
  constructor($state, UserService, Notify) {
    'ngInject';

    this.name = 'activationUser';
    this.$notify = Notify;

    UserService.sendActivation($state.params.token)
      .then((result) => {
        this.$notify.success('MESSAGES.ACCOUNT_ACTIVATED');
        $state.go('chooseSubdomain');
      })
      .catch((error) => {
        this.$notify.error(error.data.errors.map((err) => error.message), 'MESSAGES.VALIDATION_ERROR');
        $state.go('chooseSubdomain');
      })
  }
}

let activationUserComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: ActivationUserController
};

let activationUserModule = angular.module('activationUser', [])
  .component('activationUser', activationUserComponent)
  .name;

export default activationUserModule;
