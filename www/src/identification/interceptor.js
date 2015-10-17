const authInterceptor = /*@ngInject*/ function authInterceptor($rootScope) {
  'use strict';

  return {
    'request': function onRequest(config) {
      let jwtToken = $rootScope.jwtToken;

      config.headers = config.headers || {};
      if (jwtToken &&
        jwtToken !== null) {

        config.headers.Authorization = 'Bearer ' + jwtToken;
      }
      return config;
    }
  };
};

export default authInterceptor;
