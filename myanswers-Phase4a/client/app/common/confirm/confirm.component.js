import angular from 'angular';
import template from './confirm.html';
import './confirm.scss';
import confirmDirective from './confirm.directive';

class ConfirmController {
  constructor($scope) {
    'ngInject';
    this.name = 'confirm';

    this.$uibModalInstance = $scope.$parent.$uibModalInstance;
    this.answer =  $scope.$parent.$resolve.text;
  }

  ok() {
    this.$uibModalInstance.close(true);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

let confirmComponent = {
  restrict: 'E',
  bindings: {
    resolve: '<'
  },
  template,
  controller: ConfirmController
};

let confirmModule = angular.module('confirm', [])
  .component('confirmComponent', confirmComponent)
  .directive('confirm', confirmDirective)
  .name;

export default confirmModule;

