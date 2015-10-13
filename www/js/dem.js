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
      'debug': true,
      'asyncLoader': require
    });

    $stateProvider
      .state('home', {
        'url': '/',
        'controller': 'mainCtrl',
        'template': "<p>Hello {{name}}. Would you like to... <a href='renderer'>load lazy</a>?</p>"
      })
      .state('renderer', {
        'url': '/renderer',
        'controller': 'RendererCtrl',
        'templateUrl': 'templates/renderer.html',
        'resolve': {
          '_loadCtrl': function loadCtrl($ocLazyLoad) {

            return $ocLazyLoad.inject({
              'name': 'dem.renderer',
              'files': [
                './dist/renderer'
              ]
            });
          }
        }
      });

    $locationProvider.html5Mode(true);
  };

angular.module('dem', [
  'ui.router',
  'oc.lazyLoad'
])
.config(['$stateProvider', '$locationProvider', '$ocLazyLoadProvider', configurationFunction])
.controller('mainCtrl', function mainCtrl($scope) {
  'use strict';

  $scope.name = 'World';
});

export default 'dem';
