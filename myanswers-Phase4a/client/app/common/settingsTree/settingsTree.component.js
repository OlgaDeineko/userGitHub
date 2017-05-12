import template from './settingsTree.html';
import angular from 'angular';
import './settingsTree.scss';
import {MAIN_DOMAIN, DEFAULT_SUBDOMAIN} from '../../constants/config';

class SettingsTreeController {
  constructor($sce, $state) {
    "ngInject";
  }
}


let settingsTreeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: SettingsTreeController
};

let settingsTreeModule = angular.module('settingsTree', [])
  .component('settingsTree', settingsTreeComponent)
  .name;

export default settingsTreeModule;
