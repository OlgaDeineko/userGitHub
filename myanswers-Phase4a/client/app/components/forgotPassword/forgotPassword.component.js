import template from './forgotPassword.html';
import angular from 'angular';
import './forgotPassword.scss';

class ForgotPasswordController {
  constructor($scope, $state, $filter, UserService, Notify) {
    'ngInject';

    this.name = 'REGISTRATION.RESET_PASSWORD';

    this.$state = $state;
    this.$scope = $scope;
    this.translate = $filter('translate');

    this.UserService = UserService;
    this.$notify = Notify;

    this.newPass = {};
    this.initForm();
  }

  initForm() {
    this.schema = {
      type: "object",
      properties: {
        "password": {
          minLength: 8,
          type: "string",
          title: this.translate('REGISTRATION.PASSWORD'),
          "pattern": /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
          "x-schema-form": {
            "type": "password",
            "placeholder": this.translate('REGISTRATION.PASSWORD')
          },
          validationMessage: {
            202: this.translate('MESSAGES.PASSWORD_INVALID')
          },
        },
        "password_repeat": {
          minLength: 8,
          type: "string",
          title: this.translate('REGISTRATION.REPEAT_PASSWORD'),
          constant: {
            "$data": "1/password"
          },
          "x-schema-form": {
            "type": "password",
            "placeholder": this.translate('REGISTRATION.REPEAT_PASSWORD')
          }
        }
      },
      required: ["password", "password_repeat"]
    };
  }

  save(form, newPass) {
    this.$scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      this.UserService.resetPassword(this.$state.params.resetToken, newPass.password)
        .then((result) => {
          this.$notify.success('MESSAGES.PASSWORD_CHANGED');
          this.$state.go('chooseSubdomain');
        })
        .catch((error) => {
          this.$notify.error(error.data.errors.map((err) => error.message), 'MESSAGES.VALIDATION_ERROR');
        })
    }
  }
}

let forgotPasswordComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: ForgotPasswordController
};

let forgotPasswordModule = angular.module('forgotPassword', [])
  .component('forgotPassword', forgotPasswordComponent)
  .name;

export default forgotPasswordModule;
