/*global System*/
(function requireConfig(System) {
  'use strict';

  System.config({
    'baseUrl': '.',
    'paths': {
      '*': '*.js',
      'bower:*': 'lib/*'
    },
    'buildCSS': true,
    'separateCSS': false
  });

  System.config({
    'map': {
      'json': 'bower:plugin-json/json.js',
      'jquery': 'bower:jquery/dist/jquery.js',
      'three': 'bower:three.js/three.js',
      'angular': 'bower:angular/angular.js',
      'ocLazyLoad': 'bower:oclazyload/dist/ocLazyLoad.js',
      'ui-router': 'bower:angular-ui-router/release/angular-ui-router.js',
      'ui-router-extras': 'bower:ui-router-extras/release/ct-ui-router-extras.js'
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
}(System));
