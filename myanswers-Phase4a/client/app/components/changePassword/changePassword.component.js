import template from './changePassword.html';
import angular from 'angular';
import './changePassword.scss';

class ChangePasswordController {
  constructor($scope, $filter,) {
    'ngInject'

    this.$scope = $scope;
    this.translate = $filter('translate');

    this.initForm();
  }

  initForm() {
    this.schema = {
      type: "object",
      properties: {
        "currentPassword": {
          type: "string",
          title: "Current Password",
          minLength: 5,
          "x-schema-form": {
            placeholder: "Current Password",
          },
        },
        "password": {
          type: "string",
          title: "Password",
          minLength: 5,
          "x-schema-form": {
            placeholder: "Password",
          },
        },
        "passwordConfirmation": {
          type: "string",
          title: "Password Confirmation",
          minLength: 5,
          "x-schema-form": {
            placeholder: "Password Confirmation",
          },
        },
      },
      required: ["currentPassword","password","passwordConfirmation"]
    };
  }
  save(form, newPassword) {
    this.$scope.$broadcast('schemaFormValidate');
    if (form.$valid) {

    }
  }

}

let changePasswordComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: ChangePasswordController
};

let changePasswordModule = angular.module('changePassword', [])
  .component('changePassword', changePasswordComponent)
  .name;

export default changePasswordModule;
