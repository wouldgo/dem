/*global module*/
(function pathConfiguration(module) {
  'use strict';

  var paths = {
      'base': 'www/src',
      'output': 'www/dist/',
      'source': 'www/src/**/*.js',
      'html': 'www/src/**/*.html',
      'scss': {
        'file': 'www/src/**/*.scss',
        'options': {}
      },
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
      'tests': 'www/spec/e2e/**/*.spec.js'
    };

  module.exports = paths;
}(module));
