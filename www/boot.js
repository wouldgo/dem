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
      'ui-router-extras': 'bower:ui-router-extras/release/ct-ui-router-extras.js',
      'ng-file-upload-shim': 'bower:ng-file-upload/ng-file-upload-shim.js',
      'ng-file-upload': 'bower:ng-file-upload/ng-file-upload.js',
      'angular-aria': 'bower:angular-aria/angular-aria.js',
      'angular-animate': 'bower:angular-animate/angular-animate.js',
      'angular-material': 'bower:angular-material/angular-material.js',
      'angular-filter': 'bower:angular-filter/dist/angular-filter.js'
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
      },
      'ng-file-upload': {
        'deps': [
          'angular',
          'ng-file-upload-shim'
        ]
      },
      'angular-material': {
        'deps': [
          'angular',
          'angular-aria',
          'angular-animate'
        ]
      },
      'angular-filter': {
        'deps': [
          'angular'
        ]
      }
    }
  });
}(System));
