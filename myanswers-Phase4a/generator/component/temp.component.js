import angular from 'angular';
import template from './<%= name %>.html';
import './<%= name %>.scss';

class <%= upCaseName %>Controller {
  constructor() {
    this.name = '<%= name %>';
  }
}

let <%= name %>Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller: <%= upCaseName %>Controller
};

let <%= name %>Module = angular.module('<%= name %>', [])
  .component('<%= name %>', <%= name %>Component)
  .name;

export default <%= name %>Module;
