import angular from 'angular';
import Login from './login/login.component';
import Registration from './registration/registration.component';
import Category from './category/category.component';
import ChooseSubdomain from './chooseSubdomain/chooseSubdomain.component';
import Faq from './faq/faq.component';
import EditFaq from './editFaq/editFaq.component';
import Users from './users/users.component';
import Visitor from './visitor/visitor.component';
import FaqCategories from './faqCategories/faqCategories.component';
import ForgotPassword from './forgotPassword/forgotPassword.component';
import ActivationUser from './activationUser/activationUser.component';
import VisitorArticle from './visitorArticle/visitorArticle.component';
import Settings from './settings/settings.component';
import ChooseLanguage from './chooseLanguage/chooseLanguage.component';
import ChangePassword from './changePassword/changePassword.component';
import Appearance from './appearance/appearance.component';
import Accessibility from './accessibility/accessibility.component';

let componentModule = angular.module('app.components', [
  ChooseSubdomain,
  Login,
  Registration,
  Category,
  EditFaq,
  Faq,
  Users,
  Visitor,
  FaqCategories,
  ForgotPassword,
  ActivationUser,
  VisitorArticle,
  Settings,
  ChooseLanguage,
  ChangePassword,
  Appearance,
  Accessibility
])

.name;

export default componentModule;
