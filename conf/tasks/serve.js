/*global require*/
(function serveTask(require) {
  'use strict';

  var gulp = require('gulp')
    , browserSync = require('browser-sync')
    , historyApiFallback = require('connect-history-api-fallback');

  gulp.task('serve', ['watch'], function onServe(done) {
    browserSync({
      'open': true,
      'ui': false,
      'port': 3000,
      'server': {
        'baseDir': ['./www'],
        'middleware': [historyApiFallback()]
      }
    }, done);
  });
}(require));
