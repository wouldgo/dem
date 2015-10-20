/*global System*/
(function requireConfig(System) {
  'use strict';

  System.config({
    'baseUrl': '.',
    'paths': {
      'bower:*': 'lib/*'
    },
    'buildCSS': false
  });

  System.config({
    'map': {
      'json': 'bower:plugin-json/json.js',
      'css': 'bower:plugin-css/css.js',
      'jquery': 'bower:jquery/dist/jquery.min.js',
      'three': 'bower:three.js/three.min.js',
      'threejs-orbit-controls': 'https://raw.githubusercontent.com/mrdoob/three.js/r73/examples/js/controls/OrbitControls.js',
      'angular': 'bower:angular/angular.min.js',
      'ocLazyLoad': 'bower:oclazyload/dist/ocLazyLoad.min.js',
      'ui-router': 'bower:angular-ui-router/release/angular-ui-router.min.js',
      'ui-router-extras': 'bower:ui-router-extras/release/ct-ui-router-extras.min.js',
      'ng-file-upload': 'bower:ng-file-upload/ng-file-upload.min.js',
      'angular-aria': 'bower:angular-aria/angular-aria.min.js',
      'angular-animate': 'bower:angular-animate/angular-animate.min.js',
      'angular-material': 'bower:angular-material/angular-material.min.js',
      'angular-filter': 'bower:angular-filter/dist/angular-filter.min.js',
      'angular-local-storage': 'bower:angular-local-storage/dist/angular-local-storage.min.js',
      'angular-comunicator': 'bower:comunicator/dist/comunicator-angular.min.js'
    },
    'meta': {
      'jquery': {
        'exports': '$'
      },
      'three': {
        'exports': 'THREE'
      },
      'threejs-orbit-controls': {
        'deps': [
          'three'
        ]
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
          'angular'
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
      },
      'angular-local-storage': {
        'deps': [
          'angular'
        ]
      },
      'angular-comunicator': {
        'deps': [
          'angular'
        ]
      }
    }
  });
}(System));
