import template from './createCategoryModal.html';
import angular from 'angular';
import './createCategoryModal.scss';

class CreateCategoryModalController {
  constructor($scope, $filter, $stateParams, categoryHelper, CategoryService, UserService, Notify) {
    'ngInject';

    this.name = 'createCategoryModal';

    this.$scope = $scope;
    this.translate = $filter('translate');

    this.CategoryService = CategoryService;
    this.$notify = Notify;

    this.$uibModalInstance = $scope.$parent.$uibModalInstance;
    this.$resolve = $scope.$parent.$resolve;

    this.mode = 'create';
    this.type = $stateParams.categoryId ? 'Subcategory' : 'Category';
    this.newCategory = categoryHelper.newCategory($stateParams.categoryId, UserService.getFullName());
    this.parentCategory = this.$resolve.parentCategory || this.$resolve.category.parent;
    this.users = [];

    if (this.$resolve.category) {
      this.newCategory = this.$resolve.category;
      this.mode = 'update';
      if (this.newCategory.parent_id != 1) {
        this.type = 'Subcategory';
      }
    }

    CategoryService.getAll()
      .then((result) => {
        this.initForm(result)
      });
  }

  initForm(categories) {
    this.schema = {
      type: "object",
      properties: {
        "name": {
          type: "string",
          title: this.translate('CATEGORY.LABEL_TITLE'),
          minLength: 2,
          "x-schema-form": {
            placeholder: this.translate('CATEGORY.LABEL_TITLE')
          }
        },
        "author": {
          type: "string",
          title: this.translate('CATEGORY.AUTHOR'),
          readonly: true,
          minLength: 2,
          "x-schema-form": {
            placeholder: this.translate('CATEGORY.AUTHOR')
          }
        },
        "parent_id": {
          type: "number",
          title: this.translate('CATEGORY.PARENT_CATEGORY'),
          "x-schema-form": {
            key: 'parent_id',
            type: "select",
            titleMap: categories.filter((cat) => cat.parent_id == 1 || cat.parent_id == 0).map((item) => {
              return {value: item.id, name: item.name};
            })
          }
        },
        "lang": {
          type: "string",
          title: this.translate('CATEGORY.LANGUAGE'),
          "x-schema-form": {
            key: 'lang',
            type: "select",
            titleMap: this.$scope.$root.settings.languages.map((item) => {
              return {value: item.code, name: item.name};
            })
          }
        }
      },

      required: ["name", "author", "parent_id", "lang"]
    };
  }

  save(form, newCategory) {
    this.$scope.$broadcast('schemaFormValidate');
    if (form.$valid) {
      this.CategoryService[this.mode](newCategory)
        .then((result) => {
          this.$notify.success(`MESSAGES.${this.type.toUpperCase()}_${this.mode.toUpperCase()}`);
          this.$uibModalInstance.close(result);
        }, (error) => {
            this.$notify.error(error.data.errors.map((err) => error.message), 'MESSAGES.VALIDATION_ERROR');
        })
    }
  }

  cancel() {
    this.$uibModalInstance.dismiss();
  }
}

let createCategoryModalComponent = {
  restrict: 'E',
  bindings: {
    resolve: '<'
  },
  template,
  controller: CreateCategoryModalController
};

let createCategoryModalModule = angular.module('createCategoryModal', [])
  .component('createCategoryModal', createCategoryModalComponent)
  .name;

export default createCategoryModalModule;
