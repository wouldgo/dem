/*global window,requirejs*/
(function requireConfig(window, requirejs) {
  'use strict';

  requirejs.config({
    //baseUrl: 'js/lib',
    'paths': {
      'jquery': './lib/jquery/dist/jquery',
      'angular': './lib/angular/angular',
      'ocLazyLoad': './lib/oclazyload/dist/ocLazyLoad',
      'ui-router': './lib/angular-ui-router/release/angular-ui-router',
      'ui-router-extras': './lib/ui-router-extras/release/ct-ui-router-extras',
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
      'ui-router': {
        'deps': ['angular']
      },
      'ui-router-extras': {
        'deps': ['ui-router']
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
