import template from './forgotPasswordModal.html';
import angular from 'angular';
import './forgotPasswordModal.scss';

class ForgotPasswordModalController {

  constructor($scope, $filter, UserService, Notify) {
    'ngInject';
    this.name = 'REGISTRATION.FORGOT_PASSWORD';

    this.$scope = $scope;
    this.translate = $filter('translate');

    this.UserService = UserService;
    this.$notify = Notify;

    this.$uibModalInstance = $scope.$parent.$uibModalInstance;

    this.forgotPassword = {};

    this.initForm();
  }

  initForm() {
    this.schema = {
      type: "object",
      properties: {
        "email": {
          type: "string",
          title: this.translate('REGISTRATION.EMAIL'),
          minLength: 5,
          "pattern": /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
          "x-schema-form": {
            placeholder: this.translate('REGISTRATION.EMAIL'),
          },
          validationMessage: {
            202: this.translate('MESSAGES.EMAIL_INVALID')
          },
        },
      },
      required: ["email"]
    };
  }

  save(form, newUser) {
    this.$scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      this.UserService.forgotPassword(newUser.email)
        .then((result) => {
          this.$notify.success('MESSAGES.EMAIL_SENT');
          this.$uibModalInstance.close(result);
        })
        .catch((error) => {
          this.$notify.error(error.data.errors.map((err) => error.message), 'MESSAGES.VALIDATION_ERROR');
        })
    }
  }

  cancel() {
    this.$uibModalInstance.dismiss();
  }
}

let forgotPasswordModalComponent = {
  restrict: 'E',
  bindings: {
    resolve: '<'
  },
  template,
  controller: ForgotPasswordModalController
};

let forgotPasswordModalModule = angular.module('forgotPasswordModal', [])
  .component('forgotPasswordModal', forgotPasswordModalComponent)
  .name;

export default forgotPasswordModalModule;
