import angular from 'angular';

const identificationInterceptor = /*@ngInject*/ function identificationInterceptor($rootScope, $q) {
  'use strict';

  return {
    'request': (config) => {
      let jwtToken = $rootScope.jwtToken;

      config.headers = config.headers || {};
      if (jwtToken &&
        jwtToken !== null) {

        config.headers.Authorization = 'Bearer ' + jwtToken;
      }
      return config;
    },
    'responseError': (rejection) => {

      if (rejection &&
        rejection.status === 401) {

        return $q((resolve) => {

          let unregisterResponseResolved = $rootScope.$on('identification:response-resolved', (eventInfos, payload) => {

            if (angular.equals(payload.request, rejection.config)) {

              unregisterResponseResolved();
              return resolve(payload.response);
            }
          });

          $rootScope.$emit('identification:user-get-token', rejection.config);
        });
      }

      return $q.reject(rejection);
    }
  };
};

export default identificationInterceptor;
