import FaqModule from './faq'
import FaqController from './faq.controller';
import FaqComponent from './faq.component';
import FaqTemplate from './faq.html';

describe('Faq', () => {
  let $rootScope, makeController;

  beforeEach(window.module(FaqModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FaqController();
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
      expect(FaqTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FaqComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FaqTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FaqController);
      });
  });
});
