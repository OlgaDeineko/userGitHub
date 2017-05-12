import template from './visitorArticle.html';
import angular from 'angular';
import './visitorArticle.scss';

class VisitorArticleController {
  constructor($sce, $state, ArticleService, SettingsService, Notify) {
    "ngInject";
    this.name = 'faq';

    this.$state = $state;
    this.$notify = Notify;

    this.currentCategoryId = $state.params.categoryId || 1;

    this.convertHTML = $sce.trustAsHtml;

    this.SettingsService = SettingsService;
    this.ArticleService = ArticleService;

    this.faq = {};

    let isAlgoliaObject = $state.current.name == 'visitorArticleAlgolia';
    this.ArticleService.getById($state.params.faqId, isAlgoliaObject)
      .then((result) => {
        this.faq = result;
        if (isAlgoliaObject) {
          this.currentCategoryId = result.categoryId;
        }
      })
      .catch((error) => {
        this.$notify.error(error.data.errors.map((err) => error.message))
      });
  }

  copyToClipboard() {
    this.$notify.success('MESSAGES.ANSWER_COPIED');
  }
}

let visitorArticleComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: VisitorArticleController
};

let visitorArticleModule = angular.module('visitorArticle', [])
  .component('visitorArticle', visitorArticleComponent)
  .name;

export default visitorArticleModule;
