import template from './visitor.html';
import angular from 'angular';
import './visitor.scss';
import {MAIN_DOMAIN, DEFAULT_SUBDOMAIN} from '../../constants/config';

class VisitorController {
  constructor($scope, $window, $stateParams, categoryHelper,UserService, CategoryService, ArticleService, AlgoliaService, SettingsService) {
    'ngInject';

    this.name = 'Welcome to KB';

    this.$window = $window;
    this.$scope = $scope;

    this.UserService = UserService;
    this.ArticleService = ArticleService;
    this.CategoryService = CategoryService;
    this.categoryHelper = categoryHelper;
    this.SettingsService = SettingsService;


    let orderList = [
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
    this.order = orderList.find((o) => o.name == $scope.$root.KBSettings.filter.sort_by);

    this.uncategoryId = 1;
    this.currentCategory = $stateParams.categoryId || this.uncategoryId;
    this.articles = [];

    this.getAllData();
  }

  logout() {
    this.UserService.logOut();
    this.$window.location.href = `http://${DEFAULT_SUBDOMAIN}.${MAIN_DOMAIN}/subdomain`;
  }

  getAllData(update) {
    Promise.all([
      this.CategoryService.getAll(update),
      this.ArticleService.getAll(update)
    ])
      .then((result) => {
        let categories = result[0];
        let articles = result[1].filter((article) => article.status == 'published');

        this.tree = this.categoryHelper.buildTree(articles, categories, this.currentCategory);

        return this.tree.type == 'subcategory'? this.tree.parent_id: this.tree.id;
      })
      .then((categoryId) => {
        return this.ArticleService.getMostViewed(categoryId, 30)
      })
      .then((articles) => {
        this.articles = articles;
        if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') this.$scope.$apply();
      })
  }
}

let visitorComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: VisitorController
};

let visitorModule = angular.module('visitor', [])
  .component('visitor', visitorComponent)
  .name;

export default visitorModule;
