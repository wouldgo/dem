/*global __dirname,require*/
(function testTask(__dirname, require) {
  'use strict';

  var gulp = require('gulp')
    , Karma = require('karma').Server
    , gulpProtractor = require('gulp-protractor')
    , path = require('path')
    , paths = require('../paths')
    , karmaConfFile = path.resolve(__dirname, '../..', 'karma.conf.js')
    , protractorConfFile = path.resolve(__dirname, '../..', 'protractor.conf.js');

  gulp.task('test', ['build'], function onTest(done) {
    var karma = new Karma({
      'configFile': karmaConfFile
    }, function onFinish() {

      done();
    });

    karma.start();
  });

  gulp.task('e2e-test', function onE2e(done) {
    gulp.src(paths.tests)
    .pipe((gulpProtractor.protractor({
      'configFile': protractorConfFile,
      'args': ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function onError(e) {
      throw e;
    })
    .on('end', done));
  });

  gulp.task('webdriver-update', gulpProtractor.webdriver_update);
  gulp.task('webdriver-standalone', ['webdriver-update'], gulpProtractor.webdriver_standalone);
}(__dirname, require));
