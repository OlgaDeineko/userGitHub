import angular from 'angular';

import CreateCategoryModal from './createCategoryModal/createCategoryModal.component';
import CreateUserModal from './createUserModal/createUserModal.component';
import ForgotPasswordModal from './forgotPasswordModal/forgotPasswordModal.component';
import ChooseSubdomainModal from './chooseSubdomainModal/chooseSubdomainModal.component';


let modalsModule = angular.module('app.modals', [
  CreateCategoryModal,
  CreateUserModal,
  ForgotPasswordModal,
  ChooseSubdomainModal
])

  .name;

export default modalsModule;
