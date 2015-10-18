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

        $rootScope.$emit('identification:user-get-token', rejection.config);
      } else {

        return $q.reject(rejection);
      }
    }
  };
};

export default identificationInterceptor;
