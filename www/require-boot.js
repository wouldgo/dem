/*global window,requirejs*/
(function requireConfig(window, requirejs) {
  'use strict';

  requirejs.config({
    //baseUrl: 'js/lib',
    'paths': {
      'jquery': './lib/jquery/dist/jquery',
      'angular': './lib/angular/angular',
      'ocLazyLoad': './lib/oclazyload/dist/ocLazyLoad',
      'uiRouter': './lib/angular-ui-router/release/angular-ui-router',
      'three': './lib/three.js/three'
    },
    'shim': {
      'jquery': {
        'deps': [],
        'exports': '$'
      },
      'angular': {
        'deps': ['jquery'],
        'exports': 'angular'
      },
      'ocLazyLoad': {
        'deps': ['angular'],
        'exports': 'ocLazyLoad'
      },
      'uiRouter': {
        'deps': ['angular']
      },
      'three': {
        'deps': [],
        'exports': 'THREE'
      }
    }
  });

  requirejs(['./dist/index'], () => {

    window.console.info('Application loaded...');
  });
}(window, requirejs));
