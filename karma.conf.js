/*global require,module*/
(function karmaConfiguration(require, module) {
  'use strict';

  var isparta = require('isparta');

  module.exports = function exportingFunction(config) {
    config.set({
      'basePath': './www',
      'frameworks': [
        'systemjs',
        'jasmine'
      ],
      'plugins': [
        'karma-systemjs',
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-junit-reporter',
        'karma-coverage',
        'karma-verbose-reporter'
      ],
      'singleRun': true,
      'colors': true,
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      'browsers': [
        //'PhantomJS',
        'Chrome'//,
        //'Firefox'
      ],
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      'reporters': ['progress',
        'verbose'//,
        //'coverage'
      ],

      // list of files / patterns to load in the browser
      'files': [
        'boot.js',
        'spec/*.spec.js'
      ],
      // list of files to exclude
      'exclude': [
        'spec/e2e/**.*'
      ],

      'systemjs': {
        'configFile': 'boot.js',
        'config': {
          'transpiler': 'babel',
          'paths': {
            'es6-module-loader': '../node_modules/es6-module-loader/dist/es6-module-loader.js',
            'systemjs': '../node_modules/systemjs/dist/system.js',
            'system-polyfills': '../node_modules/systemjs/dist/system-polyfills.js',
            'babel': '../node_modules/babel-core/browser.js',
            'phantomjs-polyfill': '../node_modules/phantomjs-polyfill/bind-polyfill.js'
          }
        },
        'serveFiles': [
          'src/**/*.js',
          'lib/**/*.js',
          'lib/**/*.css',
          'lib/**/*.json'
        ]
      },

      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      'logLevel': config.LOG_DEBUG,

      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      'preprocessors': {
        'src/!(*spec).js': [
          'coverage'
        ]
      },

      // optionally, configure the reporter
      'coverageReporter': {
        'type': 'html',
        'dir': '../coverage/',
        'instrumenters': {
          'isparta': isparta
        },
        'instrumenter': {
          '**/*.js': 'isparta'
        }
      }
    });
  };
}(require, module));
