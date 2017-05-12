import template from './treeItem.html';
import './treeItem.scss';
import angular from 'angular';

class TreeItemController {
  constructor($scope, $state, $uibModal, CategoryService, ArticleService) {
    'ngInject';
    this.name = 'treeItem';

    this.$state = $state;
    this.$uibModal = $uibModal;

    this.CategoryService = CategoryService;
    this.ArticleService = ArticleService;
  }

  $onInit() {
    switch(this.type){
      case 'category':
        this.service = this.CategoryService;
        this.icon = "fa-folder";
        this.title = "name";
        break;
      case 'faq':
        this.service = this.ArticleService;
        this.icon = "fa-question-circle";
        this.title = "question";
        break;
    }

    this.stateConfigs = {
      name: `admin.${this.type}`,
      params: `${this.type}Id`
    }

  }

  goTo(id){
    let params = {};
    params[this.stateConfigs.params] = id;
    this.$state.go(this.stateConfigs.name, params);
  }

  remove(id){
    this.service.remove(id);
  }

  edit(id){
    switch(this.type){
      case 'category':
        this.$uibModal.open({
          component: 'createCategoryModal',
          resolve: {
            category: this.item
          }
        });
        break;
      case 'faq':
        let params = {};
        params[this.stateConfigs.params] = id;
        this.$state.go("admin.editFaq", params);
        break;
    }
  }

  toggleChildren(item) {
    if(this.type == 'faq') return;
    if(item.categories && item.categories.length)
      item.expanded = !item.expanded

    // if (!scope.$nodeScope.$modelValue.categories) {
    //   scope.$nodeScope.$modelValue.getList("categories").then(function(data) {
    //     scope.$nodeScope.$modelValue.categories = data;
    //     if (scope.$nodeScope.$modelValue.categories.length > 0) {
    //       scope.toggle();
    //     }
    //   });
    // } else {
    //   if (scope.$nodeScope.$modelValue.categories.length > 0) {
    //     scope.toggle();
    //   }
    // }
  }
}

let treeItemComponent = {
  restrict: 'EA',
  bindings: {
    type: "=",
    dragIcon: "=",
    item: "="
  },
  template,
  controller: TreeItemController
};

let treeItemModule = angular.module('treeItem', [])
  .component('treeItem', treeItemComponent)
  .name;

export default treeItemModule;
