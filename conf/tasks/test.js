/*global __dirname,require*/
(function testTask(__dirname, require) {
  'use strict';

  var gulp = require('gulp')
    , karma = require('karma').server
    , gulpProtractor = require('gulp-protractor')
    , paths = require('../paths');

  gulp.task('test', ['build'], function onTest(done) {
    karma.start({
      'configFile': __dirname + '/../../karma.conf.js',
      'singleRun': true
    }, done);
  });

  gulp.task('sauce-test', function onSauce(done) {
    gulp.src(paths.tests)
    .pipe((gulpProtractor.protractor({
      'configFile': __dirname + '/../../protractor.conf.js'
    }))
    .on('error', function onError(e) {
      throw e;
    })
    .on('end', done));
  });

  gulp.task('webdriver-update', gulpProtractor.webdriver_update);
  gulp.task('webdriver-standalone', ['webdriver-update'], gulpProtractor.webdriver_standalone);
}(__dirname, require));
