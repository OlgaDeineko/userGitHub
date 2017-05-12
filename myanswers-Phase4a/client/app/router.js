import angular from 'angular';
import uiRouter from 'angular-ui-router';

let routerModule = angular.module('routing', [
  uiRouter
])
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider

      .state('chooseSubdomain', {
        url: '/subdomain',
        component: 'chooseSubdomain',
        template: '<choose-subdomain/>',
        data: {
          permissions: {
            only: ['anonymous', 'any'],
            redirectTo: 'category'
          }
        }
      })

      .state('chooseSubdomainSuperAdmin', {
        url: '/superadmin/chooseSubdomain?t&u&d',
        controller: ($state, SessionService, UserService, SettingsService) => {
          'ngInject'

          SessionService.token.data = $state.params.t;
          SessionService.subdomain.data = $state.params.d;
          SessionService.user.data = $state.params.u;
          UserService.getUserFromStorage();
          SettingsService.getKBSettings();

          $state.go('admin.category');
        }
      })

      .state('login', {
        url: '/login',
        component: 'login',
        template: '<login/>',
        // data: {
        //   permissions: {
        //     only: 'anonymous',
        //     redirectTo: 'category'
        //   }
        // }
      })

      .state('registration', {
        url: '/registration',
        template: '<registration/>',
        component: 'registration',
        data: {
          permissions: {
            only: 'any',
            redirectTo: 'admin.category'
          }
        }
      })

      .state('activation', {
        url: '/activate?token',
        component: 'activationUser',
        template: '<activation-user/>',
        data: {
          permissions: {
            only: 'anonymous',
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('resetPassword', {
        url: '/requestPasswordReset?resetToken',
        component: 'forgotPassword',
        template: '<forgot-password/>',
        data: {
          permissions: {
            only: 'anonymous',
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('admin', {
        url: '/admin',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          settings: (SettingsService) => {
            return SettingsService.getCommonSettings();
          }
        }
      })

      .state('admin.category', {
        url: '/category/{categoryId}',
        template: '<category/>',
        component: 'category',
        data: {
          permissions: {
            only: ['user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('admin.editFaq', {
        url: '/faq/edit/{faqId}',
        template: '<edit-faq/>',
        component: 'editFaq',
        data: {
          permissions: {
            only: ['user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('admin.createFaq', {
        url: '/faq/create?categoryId',
        template: '<edit-faq/>',
        component: 'editFaq',
        data: {
          permissions: {
            only: ['user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('admin.faq', {
        url: '/faq/{faqId}',
        template: '<faq/>',
        component: 'faq',
        data: {
          permissions: {
            only: ['user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('admin.faqCategories', {
        url: '/faq-statuses/{status}',
        template: '<faq-categories/>',
        component: 'faq-categories',
        data: {
          permissions: {
            only: ['user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('admin.users', {
        url: '/users',
        template: '<users/>',
        component: 'users',
        data: {
          permissions: {
            only: ['admin', 'superAdmin'],
            redirectTo: 'admin.category'
          }
        }
      })

      .state('visitor', {
        url: '/home/:categoryId',
        template: '<visitor/>',
        component: 'visitor',
        data: {
          permissions: {
            only: ['visitor', 'user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('visitorArticle', {
        url: '/home/faq/:categoryId/:faqId',
        template: '<visitor-article/>',
        component: 'visitorArticle',
        data: {
          permissions: {
            only: ['visitor', 'user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })

      .state('visitorArticleAlgolia', {
        url: '/home/faq/:faqId',
        template: '<visitor-article/>',
        component: 'visitorArticle',
        data: {
          permissions: {
            only: ['visitor', 'user', 'admin', 'superAdmin', 'contributor'],
            redirectTo: 'chooseSubdomain'
          }
        }
      })
      .state('admin.settings', {
        url: '/settings',
        template: '<settings/>',
        component: 'settings',
        data: {
          permissions: {
            only: ['admin', 'superAdmin'],
            redirectTo: 'admin.category'
          }
        }
      })
      .state('admin.settings.chooseLanguage', {
        url: '/chooseLanguage',
        template: '<choose-language/>',
        component: 'chooseLanguage',
        data: {
          permissions: {
            only: ['admin', 'superAdmin'],
            redirectTo: 'admin.category'
          }
        }
      })
      .state('admin.settings.changePassword', {
        url: '/changePassword',
        template: '<change-password/>',
        component: 'changePassword',
        data: {
          permissions: {
            only: ['admin', 'superAdmin'],
            redirectTo: 'admin.category'
          }
        }
      }).state('admin.settings.appearance', {
      url: '/appearance',
      template: '<appearance/>',
      component: 'appearance',
      data: {
        permissions: {
          only: ['admin', 'superAdmin'],
          redirectTo: 'admin.category'
        }
      }
    }).state('admin.settings.accessibility', {
      url: '/accessibility',
      template: '<accessibility/>',
      component: 'accessibility',
      data: {
        permissions: {
          only: ['admin', 'superAdmin'],
          redirectTo: 'admin.category'
        }
      }
    });

    $urlRouterProvider.otherwise('/subdomain');
  })
  .name;

export default routerModule;
