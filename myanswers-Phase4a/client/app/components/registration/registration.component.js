import template from './registration.html';
import angular from 'angular';
import './registration.scss';
import {MAIN_DOMAIN} from '../../constants/config';

class RegistrationController {
  constructor($scope, $window, $filter, $state, UserService, Notify) {
    "ngInject";
    this.name = 'REGISTRATION.TITLE';

    this.$state = $state;
    this.$scope = $scope;
    this.$window = $window;
    this.translate = $filter('translate');

    this.UserService = UserService;
    this.$notify = Notify;

    this.registrationDone = false;
    this.isCreated = '';
    this.newUser = {};

    this.initForm();
  }

  initForm() {
    this.schema = {
      type: "object",
      properties: {
        "first_name": {
          minLength: 3,
          type: "string",
          title: this.translate('REGISTRATION.FIRST_NAME'),
          "x-schema-form": {
            "placeholder": this.translate('REGISTRATION.FIRST_NAME')
          }
        },
        "last_name": {
          minLength: 3,
          type: "string",
          title: this.translate('REGISTRATION.LAST_NAME'),
          "x-schema-form": {
            "placeholder": this.translate('REGISTRATION.LAST_NAME')
          }
        },
        "email": {
          type: "string",
          title: this.translate('REGISTRATION.EMAIL'),
          require: true,
          "pattern": /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
          "x-schema-form": {
            placeholder: this.translate('REGISTRATION.EMAIL'),
          },
          validationMessage: {
            202: this.translate('MESSAGES.EMAIL_INVALID')
          },
        },
        "subdomain": {
          require: true,
          minLength: 4,
          type: "string",
          title: this.translate('REGISTRATION.SUBDOMAIN'),
          "x-schema-form": {
            "placeholder": this.translate('REGISTRATION.SUBDOMAIN')
          }
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
      required: ["first_name", "last_name", "email", "subdomain", "password", "password_repeat"]
    };
  }

  moteToLogin() {
    if (this.isCreated) {
      this.$window.location.href = `http://${this.isCreated}.${MAIN_DOMAIN}/login`;
    } else {
      this.$state.go("chooseSubdomain");
    }
  }

  register(form, newUser) {
    this.$scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      this.UserService.register(newUser)
        .then((result) => {
          this.isCreated = newUser.subdomain.toLowerCase();
          this.$notify.success('MESSAGES.REGISTRATION_DONE_MSG');
          this.registrationDone = true;
        })
        .catch((error) => {
          this.$notify.success(error.data.errors.map((err) => error.message), 'MESSAGES.VALIDATION_ERROR');
        })
    }
  }
}

let registrationComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: RegistrationController
};

let registrationModule = angular.module('registration', [])
  .component('registration', registrationComponent)
  .name;

export default registrationModule;
