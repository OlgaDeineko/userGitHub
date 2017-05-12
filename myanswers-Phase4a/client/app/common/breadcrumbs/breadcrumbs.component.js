import template from './breadcrumbs.html';
import './breadcrumbs.scss';
import angular from 'angular';

class BreadcrumbsController {
  constructor($scope, $state, CategoryService) {
    'ngInject';

    this.name = 'breadcrumbs';
    this.$state = $state;
    this.$scope = $scope;

    this.breadcrumbs = [];

    $scope.$watch(()=>{
      return this.current;
    }, () => {
      CategoryService.getAll()
        .then((result) => {
          let id = this.current;
          while (id != 1) {
            let category = result.find((c) => c.id == id);
            this.breadcrumbs.unshift(category);
            id = category.parent_id;
          }
          if(this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') this.$scope.$apply();

        })
    })
  }

  goTo(categoryId) {
    let stateName = (/^admin\./.test(this.$state.current.name) ? 'admin.category': 'visitor');
    this.$state.go(stateName, {"categoryId": categoryId});
  }
}

let breadcrumbsComponent = {
  restrict: 'E',
  bindings: {
    current: '=',
    home: '=',
    last: '='
  },
  template,
  controller: BreadcrumbsController
};

let breadcrumbsModule = angular.module('breadcrumbs', [])
  .component('breadcrumbs', breadcrumbsComponent)
  .name;

export default breadcrumbsModule;

