import template from './typeOfQuestions.html';
import angular from 'angular';
import './typeOfQuestions.scss';

class TypeOfQuestionsController {
  constructor(ArticleService) {
    'ngInject'
    this.name = 'Questions';
    this.ArticleService = ArticleService;
  }
}

let typeOfQuestionsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: TypeOfQuestionsController
};

let typeOfQuestionsModule = angular.module('typeOfQuestions', [])
  .component('typeOfQuestions', typeOfQuestionsComponent)
  .name;

export default typeOfQuestionsModule;
