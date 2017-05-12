import angular from 'angular';

import Navbar from './navbar/navbar.component';
import TypeOfQuestions from './typeOfQuestions/typeOfQuestions.component';
import CategoryTree from './categoryTree/categoryTree.component';
import Breadcrumbs from './breadcrumbs/breadcrumbs.component';
import TreeItem from './treeItem/treeItem.component';
import CancelBtn from './cancelBtn/cancelBtn.component';
import Spinner from './spinner/spinner.component';
import AlgoliaSearch from './algoliaSearch/algoliaSearch.component';
import RoleAccesses from './roleAccesses/roleAccesses';
import Confirm from './confirm/confirm.component';
import CheckUsers from './checkUsers/checkUsers.component';
import SettingsTree from './settingsTree/settingsTree.component';

let commonModule = angular.module('app.common', [
  Breadcrumbs,
  TypeOfQuestions,
  CategoryTree,
  Navbar,
  TreeItem,
  CancelBtn,
  Spinner,
  AlgoliaSearch,
  RoleAccesses,
  Confirm,
  CheckUsers,
  SettingsTree
])

  .name;

export default commonModule;
