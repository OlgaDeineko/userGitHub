import template from './settings.html';
import angular from 'angular';
import './settings.scss';

class SettingsController {
  constructor($sce, $state) {
    "ngInject";
  }
}


let settingsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: SettingsController
};

let settingsModule = angular.module('settings', [])
  .component('settings', settingsComponent)
  .name;

export default settingsModule;
