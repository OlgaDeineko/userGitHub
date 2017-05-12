import CategoryTreeModule from './categoryTree'
import CategoryTreeController from './categoryTree.controller';
import CategoryTreeComponent from './categoryTree.component';
import CategoryTreeTemplate from './categoryTree.html';

describe('CategoryTree', () => {
  let $rootScope, makeController;

  beforeEach(window.module(CategoryTreeModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CategoryTreeController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(CategoryTreeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = CategoryTreeComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(CategoryTreeTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(CategoryTreeController);
      });
  });
});
