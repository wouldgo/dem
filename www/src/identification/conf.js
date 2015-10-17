export const identificationConf = /*@ngInject*/ function configurationFunction(config, $httpProvider, localStorageServiceProvider) {
  'use strict';

  localStorageServiceProvider.setPrefix(config.application.shortName);
  $httpProvider.interceptors.push('authInterceptor');
};
