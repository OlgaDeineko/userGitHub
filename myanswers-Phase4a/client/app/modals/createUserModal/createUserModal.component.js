import template from './createUserModal.html';
import angular from 'angular';
import './createUserModal.scss';

class CreateUserModalController {
  constructor($scope, $filter, UsersService, Notify) {
    'ngInject';
    this.name = 'createUserModal';

    this.$scope = $scope;
    this.translate = $filter('translate');

    this.UsersService = UsersService;
    this.$notify = Notify;

    this.mode = 'create';

    this.$uibModalInstance = $scope.$parent.$uibModalInstance;
    this.$resolve = $scope.$parent.$resolve;

    this.newUser = {};

    if (this.$resolve.user) {
      this.newUser = this.$resolve.user;
      this.newUser.role = this.newUser.roleName
      this.mode = 'update';
    }

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
            placeholder: this.translate('REGISTRATION.EMAIL')
          },
          validationMessage: {
            202: this.translate('MESSAGES.EMAIL_INVALID')
          },
        },
        "first_name": {
          type: "string",
          title: this.translate('REGISTRATION.FIRST_NAME'),
          minLength: 3,
          "x-schema-form": {
            placeholder: this.translate('REGISTRATION.FIRST_NAME')
          }
        },
        "last_name": {
          type: "string",
          title: this.translate('REGISTRATION.LAST_NAME'),
          minLength: 3,
          "x-schema-form": {
            placeholder: this.translate('REGISTRATION.LAST_NAME')
          }
        },
        "role": {
          type: "string",
          title: this.translate('USERS.ROLE'),
          "x-schema-form": {
            key: 'role',
            type: "select",
            titleMap: this.$scope.$root.settings.roles.map((item) => {
              return {value: item.code, name: item.name};
            })
          }
        }
      },
      required: ["email", "first_name", "last_name", "role"]
    };
  }

  save(form, newUser) {
    this.$scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      this.UsersService[this.mode](newUser)
        .then((result) => {
          this.$notify.success(`MESSAGES.USER_${this.mode.toUpperCase()}`);
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

let createUserModalComponent = {
  restrict: 'E',
  bindings: {
    resolve: '<'
  },
  template,
  controller: CreateUserModalController
};

let createUserModalModule = angular.module('createUserModal', [])
  .component('createUserModal', createUserModalComponent)
  .name;

export default createUserModalModule;
