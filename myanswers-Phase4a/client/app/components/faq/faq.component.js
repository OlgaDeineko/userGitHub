import template from './faq.html';
import angular from 'angular';
import './faq.scss';

class FaqController {
  constructor($sce, $state, Notify, ArticleService, SettingsService, FilesService) {
    "ngInject";
    this.name = 'FAQ.TITLE';

    this.$state = $state;
    this.$notify = Notify;

    this.SettingsService = SettingsService;
    this.ArticleService = ArticleService;
    this.FilesService = FilesService;

    this.convertHTML = $sce.trustAsHtml;
    this.faq = null;

    this.ArticleService.getById($state.params.faqId)
      .then((result) => {
        this.faq = result;
      }, (error) => {
        this.$notify.error(error.data.errors.map((err) => err.message));
        this.$state.go('admin.category');
      })
  }

  goTo() {
    this.$state.go("admin.editFaq", this.$state.params);
  }
}

let faqComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: FaqController
};

let faqModule = angular.module('faq', [])
  .component('faq', faqComponent)
  .name;

export default faqModule;
