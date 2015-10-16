/*global window*/

/*@ngInject*/
const configurationFunction = /*@ngInject*/ function configurationFunction($urlRouterProvider, $locationProvider, $compileProvider, $logProvider, $httpProvider, $ocLazyLoadProvider, $mdThemingProvider) {
  'use strict';

  $locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/');
  $mdThemingProvider.theme('Deep Orange');

  if (!window.debug) {

    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
    $ocLazyLoadProvider.config({
      'debug': true
    });
  }
};

export default configurationFunction;
