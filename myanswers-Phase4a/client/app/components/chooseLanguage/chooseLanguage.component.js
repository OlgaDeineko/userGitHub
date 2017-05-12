import template from './chooseLanguage.html';
import angular from 'angular';
import './chooseLanguage.scss';

class ChooseLanguageController {
  constructor($scope, SettingsService, Notify) {
    'ngInject'

    this.SettingsService = SettingsService;
    this.$notify = Notify;

    this.languages = $scope.$root.settings.languages.filter((lang) => lang.code == 'en' || lang.code == 'nl');
    this.languageModel = $scope.$root.KBSettings.lang.code;

  }


  save() {
    this.$notify.success('MESSAGES.LANGUAGE_CHANGED');
    this.SettingsService.changeLanguage(this.languageModel);
  }
}

let chooseLanguageComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: ChooseLanguageController
};

let chooseLanguageModule = angular.module('chooseLanguage', [])
  .component('chooseLanguage', chooseLanguageComponent)
  .name;

export default chooseLanguageModule;
