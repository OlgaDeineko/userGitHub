import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {permission, uiPermission} from 'angular-permission';
import Common from './common/common';
import Components from './components/components';
import Modals from './modals/modals';
import AppComponent from './app.component';
import Router from './router';
import Services from './services/services';
import Helpers from './helpers/helpers';


//
import 'angular-schema-form';
import 'angular-schema-form-bootstrap';
import 'angular-ui-bootstrap';
import 'normalize.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'angular-ui-tree';
import 'ng-tags-input';
import 'ng-tags-input/build/ng-tags-input.min.css';
import 'angular-clipboard';
import  'ng-table';
import  'ng-table/bundles/ng-table.css';
import 'algoliasearch';
import 'angular-sanitize';
import 'tinymce';
import 'angular-ui-tinymce';
import 'angular-toastr';
import 'angular-toastr/dist/angular-toastr.min.css';
import './styles/font-awesome-4.7.0/css/font-awesome.min.css';
import 'ng-flow/dist/ng-flow-standalone';
import 'flag-icon-css/css/flag-icon.min.css';
// import 'bootstrap-toggle/css/bootstrap-toggle.min.css';
// import 'bootstrap-toggle/js/bootstrap-toggle.min';

import 'angular-drag-and-drop-lists';
import 'angular-translate';
import 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files';
import 'angularjs-color-picker/dist/angularjs-color-picker.min';
import 'angularjs-color-picker/dist/angularjs-color-picker.min.css';
import 'angularjs-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css'

import 'tinymce/skins/lightgray/skin.min.css';
// import 'tinymce/skins/lightgray/content.min.css';
import 'tinymce/plugins/codesample/css/prism.css';
import 'tinymce/plugins/visualblocks/css/visualblocks.css';

import 'tinymce/themes/modern/theme';

import 'tinymce/plugins/advlist/plugin';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/lists/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/charmap/plugin';
import 'tinymce/plugins/print/plugin';
import 'tinymce/plugins/preview/plugin';
import 'tinymce/plugins/hr/plugin';
import 'tinymce/plugins/anchor/plugin';
import 'tinymce/plugins/pagebreak/plugin';
import 'tinymce/plugins/searchreplace/plugin';
import 'tinymce/plugins/wordcount/plugin';
import 'tinymce/plugins/visualblocks/plugin';
import 'tinymce/plugins/visualchars/plugin';
import 'tinymce/plugins/code/plugin';
import 'tinymce/plugins/fullscreen/plugin';
import 'tinymce/plugins/insertdatetime/plugin';
import 'tinymce/plugins/media/plugin';
import 'tinymce/plugins/nonbreaking/plugin';
import 'tinymce/plugins/save/plugin';
import 'tinymce/plugins/table/plugin';
import 'tinymce/plugins/contextmenu/plugin';
import 'tinymce/plugins/directionality/plugin';
import 'tinymce/plugins/emoticons/plugin';
import 'tinymce/plugins/template/plugin';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/textcolor/plugin';
import 'tinymce/plugins/colorpicker/plugin';
import 'tinymce/plugins/textpattern/plugin';
import 'tinymce/plugins/imagetools/plugin';
import 'tinymce/plugins/codesample/plugin';
import 'tinymce/plugins/toc/plugin';
//
import enDictionary from './i18n/en.json';
import nlDictionary from './i18n/nl.json';
import './i18n/tinyMCE/en.js';
import './i18n/tinyMCE/nl.js';

import {VALIDATION_ERROR_CODES} from './constants/validationErrorCodes'

angular.module('app', [
  uiRouter,
  permission,
  uiPermission,
  Common,
  Components,
  Modals,
  Router,
  Services,
  Helpers,

  'ui.bootstrap',
  'schemaForm',
  'ui.tree',
  'ui.tinymce',
  'ngTagsInput',
  'angular-clipboard',
  'ngTable',
  'ngSanitize',
  'toastr',
  'flow',
  'dndLists',
  'pascalprecht.translate',
  'color.picker'
])
  .config(($locationProvider, $httpProvider, flowFactoryProvider, $translateProvider, $provide) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push('ResponseObserver');

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
      return function (exception, cause) {
        if (/^Possibly unhandled rejection:/.test(exception)) {
          return;
        }
        $delegate(exception, cause);
      };
    });
    $provide.decorator('ColorPickerOptions', function($delegate) {
      var options = angular.copy($delegate);
      options.saturation = true;
      options.inputClass = 'form-control';
      options.placeholder = '#7a7a7a';
      options.format = 'hex';
      options.swatchPos = 'right';
      return options;
    });

    $translateProvider.useSanitizeValueStrategy("escapeParameters");

    $translateProvider
      .translations("en", enDictionary)
      .translations("nl", nlDictionary)
      .preferredLanguage("en");

    flowFactoryProvider.factory = function (opts) {
      let Flow = require('ng-flow/dist/ng-flow-standalone');
      return new Flow(opts)
    };
  })


  .component('app', AppComponent)
  .run(($rootScope, $state, UserService, SessionService, SettingsService, sfErrorMessage, $translate) => {
    "ngInject";
    //if user logged get setting
    //TODO: rewrite: load before angular.bootstrap
    if (UserService.isLogin) {
      UserService.getUserFromStorage();
      SettingsService.getKBSettings();
      UserService.identifyFS();
    }

    //initialise permissions
    $rootScope.$on('$stateChangeStart', (event, next) => {
      UserService.initPermission();
    });

    //save previous page
    $rootScope.$on('$stateChangeSuccess', (ev, to, toParams, from, fromParams) => {
      if (from.name) {
        SessionService.setPreviousPage(from.name, fromParams)
      }
    });

    $rootScope.$on('$translateChangeSuccess', () => {
      let translates = $translate.getTranslationTable();
      for (let error in VALIDATION_ERROR_CODES) {
        sfErrorMessage.defaultMessages[VALIDATION_ERROR_CODES[error]] = translates[`VALIDATION_ERRORS.${error}`];
      }
    });
  });
