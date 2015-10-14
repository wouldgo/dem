/*global window*/

const configurationFunction = function configurationFunction($urlRouterProvider, $locationProvider, $compileProvider, $logProvider, $httpProvider, $ocLazyLoadProvider) {
  'use strict';

  $locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/');

  if (!window.debug) {

    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }

  $ocLazyLoadProvider.config({
    'debug': true
  });
};

export default ['$urlRouterProvider',
  '$locationProvider',
  '$compileProvider',
  '$logProvider',
  '$httpProvider',
  '$ocLazyLoadProvider',
  configurationFunction];
