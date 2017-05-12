import template from './categoryTree.html';
import './categoryTree.scss';
import angular from 'angular';

class CategoryTreeController {
  constructor($scope, CategoryService, ArticleService, SettingsService, UserService) {
    'ngInject';

    this.name = 'categoryTree';
    this.$scope = $scope;

    this.CategoryService = CategoryService;
    this.SettingsService = SettingsService;
    this.ArticleService = ArticleService;
    this.UserService = UserService;

    this.orderList = [
      {
        name: 'CUSTOM',
        cat: '',
        faq: ''
      },
      {
        name: 'NAME_ASC',
        cat: 'name',
        faq: 'question'
      },
      {
        name: 'NAME_DESC',
        cat: '-name',
        faq: '-question'
      },
      {
        name: 'AUTHOR_ASC',
        cat: 'author',
        faq: 'author'
      },
      {
        name: 'AUTHOR_DESC',
        cat: '-author',
        faq: '-author'
      },
      {
        name: 'LAST_CREATED',
        cat: '-crated_at',
        faq: '-crated_at'
      },
      {
        name: 'LAST_UPDATED',
        cat: '-updated_at',
        faq: '-updated_at'
      },
    ];
    this.order = this.orderList.find((o) => o.name == $scope.$root.KBSettings.filter.sort_by);

    this.searchModel = "";

    $scope.$on('updateArticles', () => {
      this.getAllData(true);
    });
    $scope.$on('updateCategories', () => {
      this.getAllData(true);
    });

    this.getAllData();
  }


  getAllData(update) {
    Promise.all([
      this.CategoryService.getAll(update),
      this.ArticleService.getAll(update)
    ]).then((result) => {
      this.allCategories = result[0].filter((category) => category.parent_id != 0);
      this.allArticles = (this.articleType == 'all')
        ? result[1].filter((a) => a.status != 'trash')
        : result[1].filter((a) => a.status == this.articleType);
      if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') this.$scope.$apply();
    });
  }

  movedCategory(index, item) {
    this.tree.categories.splice(index, 1);
    let order = [];
    let idx = 0;

    this.tree.categories.forEach(item => {
      if (item.sort_order != idx) {
        order.push({id: item.id, order: idx})
      }
      idx++;
    });

    this.CategoryService.changeOrder(order);
  }

  movedArticle(index, item) {
    this.tree.articles.splice(index, 1);
    let order = [];
    let idx = 0;

    this.tree.articles.forEach(item => {
      if (item.sort_order != idx) {
        order.push({id: +item.id, order: idx})
      }
      idx++;
    });

    this.ArticleService.changeOrder(order);
  }

  changeOrder(item) {
    this.order = item;
    this.SettingsService.changeCategoryOrder(item.name);
  }
}

let categoryTreeComponent = {
  restrict: 'E',
  bindings: {
    tree: "=",
    articleType: "="
  },
  template,
  controller:CategoryTreeController
};

let categoryTreeModule = angular.module('categoryTree', [])
  .component('categoryTree', categoryTreeComponent)
  .name;

export default categoryTreeModule;
