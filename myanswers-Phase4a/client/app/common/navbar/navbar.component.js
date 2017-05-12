import template from './navbar.html';
import './navbar.scss';
import angular from 'angular';
import {MAIN_DOMAIN, DEFAULT_SUBDOMAIN} from '../../constants/config';

class NavbarController {
  constructor($uibModal, $window, UserService) {
    "ngInject";

    this.name = 'navbar';

    this.$window = $window;
    this.$uibModal = $uibModal;

    this.UserService = UserService;
  }

  logout() {
    this.UserService.logOut();
    this.$window.location.href = `http://${DEFAULT_SUBDOMAIN}.${MAIN_DOMAIN}/subdomain`;
  }

  openChooseDomain() {
    this.$uibModal.open({
      component: 'chooseSubdomainModal'
    });
  }

  // openChooseLanguage() {
  //   this.$uibModal.open({
  //     component: 'chooseLanguage'
  //   });
  // }
}

let navbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: NavbarController
};

let navbarModule = angular.module('navbar', [])
  .component('navbar', navbarComponent)
  .name;

export default navbarModule;
