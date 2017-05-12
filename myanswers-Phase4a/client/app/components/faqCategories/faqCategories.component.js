import template from '../category/category.html';
import angular from 'angular';
import './faqCategories.scss';

class CategoryController {
  constructor($stateParams, $scope, $uibModal) {
    "ngInject";

    this.articleType = $stateParams.status;
    this.name = 'FAQ.STATUSES_PAGE.' + this.articleType.toUpperCase();

    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.tree = null;

    this.currentCategory = 1;
  }

  createCategory() {
    this.$uibModal.open({
      component: 'createCategoryModal'
    });
  };
}

let faqCategoriesComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: CategoryController
};

let faqCategoriesModule = angular.module('faqCategories', [])
  .component('faqCategories', faqCategoriesComponent)
  .name;

export default faqCategoriesModule;
