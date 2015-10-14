/*global module*/
(function pathConfiguration(module) {
  'use strict';

  module.exports = {
    'base': 'www/src',
    'output': 'www/dist/',
    'source': 'www/src/**/*.js',
    'html': 'www/src/**/*.html',
    'less': ['www/src/**/*.less'],
    'json': 'www/src/**/*.json',
    'templates': 'www/src/**/*.html',
    'outputCss': 'www/dist/**/*.css',
    'assets': [
      'www/src/**/*.json',
      'www/src/**/*.svg',
      'www/src/**/*.woff',
      'www/src/**/*.ttf',
      'www/src/**/*.png',
      'www/src/**/*.ico',
      'www/src/**/*.jpg',
      'www/src/**/*.gif',
      'www/src/**/*.eot'
    ],
    'tests': 'spec/e2e/**/*.spec.js'
  };
}(module));
