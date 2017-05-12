import template from './appearance.html';
import angular from 'angular';
import './appearance.scss';

class AppearanceController {
  constructor($sce, $state) {
    "ngInject";
    this.knowledge_base = [{name:''}];
    this.color = '#7a7a7a';
  }
}


let appearanceComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: AppearanceController
};

let appearanceModule = angular.module('appearance', [])
  .component('appearance', appearanceComponent)
  .name;

export default appearanceModule;
