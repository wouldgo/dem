/*global window*/

const configurationFunction = /*@ngInject*/ function configurationFunction($urlRouterProvider, $locationProvider, $compileProvider, $logProvider, $httpProvider, $ocLazyLoadProvider, $mdThemingProvider, config, ComunicatorProvider) {
  'use strict';

  $locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  $httpProvider.defaults.withCredentials = true; //xhr Credentials
  $urlRouterProvider.otherwise('/');
  ComunicatorProvider.setComunicatorServerURL(config.ws.address);

  $mdThemingProvider.theme('Deep Orange');

  if (window.noDebug) {

    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }
};

export default configurationFunction;
