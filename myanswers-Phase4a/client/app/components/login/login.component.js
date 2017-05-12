import template from './login.html';
import angular from 'angular';
import './login.scss';
import {DEFAULT_SUBDOMAIN} from '../../constants/config';

class LoginController {
  constructor($scope, $state, $filter, $uibModal, UserService, SessionService, SettingsService, Notify) {
    "ngInject";

    this.name = 'REGISTRATION.LOGIN';

    this.$scope = $scope;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.translate = $filter('translate');

    this.UserService = UserService;
    this.SettingsService = SettingsService;
    this.$notify = Notify;

    this.subdomain = SessionService.getSubdomain();

    this.user = {};
    this.initForm();

    if (this.subdomain == DEFAULT_SUBDOMAIN) {
      this.$state.go("chooseSubdomain");
    }
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
        }
      },
      required: ["subdomain", "email", "password"]
    };
  }

  login(loginForm, user) {
    this.$scope.$broadcast('schemaFormValidate');
    if (loginForm.$valid) {
      user.subdomain = this.subdomain;
      this.UserService.login(user)
        .then(() => {
          return this.SettingsService.getKBSettings();
        })
        .then(() => {
          this.UserService.identifyFS();
          if (this.UserService.getRole() == 'visitor') {
            this.$state.go("visitor");
          } else {
            this.$state.go("admin.category");
          }
        })
        .catch((error) => {
          this.$notify.error(error.data.errors.map((err) => error.message), 'MESSAGES.VALIDATION_ERROR');
        })
    }
  }

  forgot() {
    this.$uibModal.open({
      component: 'forgotPasswordModal'
    });
  }
}

let loginComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: LoginController
};

let loginModule = angular.module('login', [])
  .component('login', loginComponent)
  .name;

export default loginModule;
