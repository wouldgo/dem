/*global window,System*/
(function requireConfig(window, System) {
  'use strict';

  System.config({
    'baseUrl': '/dist',
    'paths': {
      '*': '*.js'
    },
    'buildCSS': true,
    'separateCSS': false
  });

  System.config({
    'map': {
      'json': 'lib/plugin-json/json',
      'jquery': 'lib/jquery/dist/jquery',
      'three': 'lib/three.js/three',
      'angular': 'lib/angular/angular',
      'ocLazyLoad': 'lib/oclazyload/dist/ocLazyLoad',
      'ui-router': 'lib/angular-ui-router/release/angular-ui-router',
      'ui-router-extras': 'lib/ui-router-extras/release/ct-ui-router-extras'
    },
    'meta': {
      'jquery': {
        'exports': '$'
      },
      'three': {
        'exports': 'THREE'
      },
      'angular': {
        'deps': [
          'jquery'
        ],
        'exports': 'angular'
      },
      'ocLazyLoad': {
        'deps': [
          'angular'
        ]
      },
      'ui-router': {
        'deps': [
          'angular'
        ]
      },
      'ui-router-extras': {
        'deps': [
          'angular'
        ]
      }
    }
  });
}(window, System));
