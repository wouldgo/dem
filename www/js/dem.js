/*global require*/
import angular from 'angular';
/*eslint-disable no-unused-vars*/
/*jshint +W098 */
import uiRouter from 'uiRouter';
import ocLazyLoad from 'ocLazyLoad';
/*eslint-enable no-unused-vars*/
/*jshint -W098 */

const configurationFunction = function configurationFunction($stateProvider, $locationProvider, $ocLazyLoadProvider) {
    'use strict';

    $ocLazyLoadProvider.config({
      'loadedModules': ['dem'],
      'asyncLoader': require
    });

    $stateProvider
      .state('home', {
        'url': '/',
        'template': "<p>Hello {{name}}. Would you like to... <a href='lazy'>load lazy</a>?</p>",
        'controller': 'mainCtrl'
      })
      .state('lazy', {
        'url': '/lazy',
        'lazyModule': 'app.lazy',
        'lazyFiles': 'lazy',
        'lazyTemplateUrl': 'lazy.html',
        'controller': 'lazyCtrl'
      });

    $locationProvider.html5Mode(true);
  };

angular.module('dem', [
  'ui.router',
  'oc.lazyLoad'/*,
  'oc.lazyLoad.uiRouterDecorator'*/
])
.config(['$stateProvider', '$locationProvider', '$ocLazyLoadProvider', configurationFunction])
.controller('mainCtrl', function mainCtrl($scope) {
  'use strict';

  $scope.name = 'World';
});

export default 'dem';
