import template from './chooseSubdomain.html';
import angular from 'angular';
import './chooseSubdomain.scss';
import {MAIN_DOMAIN, DEFAULT_SUBDOMAIN} from '../../constants/config';

class ChooseSubdomainController {
  constructor($window, SubdomainService, SessionService, Notify) {
    "ngInject";
    this.name = 'SUBDOMAIN.TITLE';

    this.$window = $window;
    this.SubdomainService = SubdomainService;
    this.$notify = Notify;

    SessionService.user.remove();
    SessionService.token.remove();

    let locationSubdomain = SessionService.getSubdomain();
    if (locationSubdomain != DEFAULT_SUBDOMAIN) {
      this.subdomain = locationSubdomain;
      this.moveTo(this.subdomain);
    }
  }

  moveTo(subdomain) {
    this.SubdomainService.check(subdomain)
      .then((result) => {
        this.$window.location.href = `http://${subdomain}.${MAIN_DOMAIN}/login`;
      })
      .catch((error) => {
        this.$notify.error(error.data.errors.map((err) => error.message), 'MESSAGES.VALIDATION_ERROR');
      })
  }
}

let chooseSubdomainComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: ChooseSubdomainController
};

let chooseSubdomainModule = angular.module('chooseSubdomain', [])
  .component('chooseSubdomain', chooseSubdomainComponent)
  .name;

export default chooseSubdomainModule;
