import {LOCAL} from '../constants/config';

function ResponseObserver($q, $injector, $rootScope, Notify, spinnerFactory, SessionService, FakeDataService) {
  "ngInject";
  return {
    'request': (config) => {
      //TODO: remove on production
      if (LOCAL && !(/(html|json)$/.test(config.url))) {
        return $q.reject({
          err: 'RejectForLocal',
          url: config.url.replace(/http.*\/api\/v1\//, ''),
          method: config.method
        });
      }

      switch (config.method) {
        case 'POST':
          config.headers['Content-Type'] = 'application/json; charset=UTF-8';
          break;
      }
      if (SessionService.getSubdomain()) {
        config.headers['Client-Subdomain'] = SessionService.getSubdomain();
        config.headers['Authorization'] = 'Bearer ' + SessionService.token.data;
      }
      spinnerFactory.start();
      return config;
    },
    'response': (response) => {
      if (!(/(html|json)$/.test(response.config.url))) {
        console.info(
          response.config.method,
          response.config.url.match(/.*\/api\/(v1\/.*)$/)[1],
          response);
      }

      if (response.data.status == 0) {
        spinnerFactory.reject();
        return $q.reject(response);
      }

      spinnerFactory.end();
      return response;
    },
    'responseError': (errorResponse) => {
      spinnerFactory.reject();
      //TODO: remove on production
      if (errorResponse.err == 'RejectForLocal') {
        return $q.resolve(FakeDataService.getData(errorResponse.url, errorResponse.method))
      }

      console.warn('responseError', errorResponse);

      //@see http://stackoverflow.com/a/25496219
      let stateService = $injector.get('$state');
      switch (errorResponse.status) {
        case 403:
          Notify.error("You don't have access to this actions");
          let previous = SessionService.previousPage.data;
          if (previous && previous.stateName) {
            stateService.go(previous.stateName, previous.params);
          } else {
            stateService.go('admin.category');
          }
          break;
        case 401:
          Notify.error('Please login again', `Authorisation error:`);
          SessionService.user.remove();
          SessionService.token.remove();
          stateService.go('chooseSubdomain');
          break;
        case 500:
          Notify.error(errorResponse.data.message, `Server error ${errorResponse.status}:`);
          break;
        case 404:
          //Notify.error("Resource not found");
          break;
      }
      return $q.reject(errorResponse);
    }
  };
}

export default ResponseObserver;
