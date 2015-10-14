/*global require,console*/
(function watchTask(require, console) {
  'use strict';

  var gulp = require('gulp')
    , paths = require('../paths')
    , browserSync = require('browser-sync')
    , changed = function changed(event) {

      /*eslint-disable no-console*/
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      /*eslint-enable no-console*/
    };

  gulp.task('watch', ['lint', 'build'], function onWatch() {

    gulp.watch([paths.source], ['es6', 'lint', browserSync.reload]).on('change', changed);
    gulp.watch([paths.html], ['html', browserSync.reload]).on('change', changed);
    gulp.watch([paths.less], ['less']).on('change', changed);
  });
}(require, console));
