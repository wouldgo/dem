/*global window,requirejs,define*/
(function requireConfig(window, requirejs, define) {
  'use strict';

  requirejs.config({
    //baseUrl: 'js/lib',
    'paths': {
      'jquery': './lib/jquery/dist/jquery',
      'three': './lib/three.js/three'
    },
    'shim': {
      'jquery': {
        'deps': [],
        'exports': '$'
      },
      'three': {
        'deps': [],
        'exports': 'THREE'
      }
    }
  });

  define(['./dist/index'], function onIndexModuleLoaded() {

    window.console.info('Application loaded...');
  });
}(window, requirejs, define));
