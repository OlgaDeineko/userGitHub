import angular from 'angular';
import template from './spinner.html';
import './spinner.scss';
import spinnerFactory from './spinner.factory';

class SpinnerController {
  constructor(spinnerFactory) {
    'ngInject';
    this.name = 'spinner';

    this.hasSpinner = spinnerFactory.hasSpinner;
  }
}

let spinnerComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: SpinnerController
};

let spinnerModule = angular.module('spinner', [])
  .component('spinner', spinnerComponent)
  .factory('spinnerFactory', spinnerFactory)
  .name;

export default spinnerModule;

