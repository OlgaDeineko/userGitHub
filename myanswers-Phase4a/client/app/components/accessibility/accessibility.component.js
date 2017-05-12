import template from './accessibility.html';
import angular from 'angular';
import './accessibility.scss';


class AccessibilityController {
  constructor($sce, $state) {
    "ngInject";
  }
}


let accessibilityComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: AccessibilityController
};

let accessibilityModule = angular.module('accessibility', [])
  .component('accessibility', accessibilityComponent)
  .name;

export default accessibilityModule;
