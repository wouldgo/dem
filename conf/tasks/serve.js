/*global console,__dirname,require*/
(function serveTask(console, __dirname, require) {
  'use strict';

  var gulp = require('gulp')
    , path = require('path')
    , runSequence = require('run-sequence')
    , browserSync = require('browser-sync')
    , nodemon = require('gulp-nodemon')
    , proxyMiddleware = require('http-proxy-middleware')
    , historyApiFallback = require('connect-history-api-fallback')
    , serverIndexFile = path.resolve(__dirname, '../..', 'server/index.js')
    , proxy = proxyMiddleware('/api', {
        'target': 'http://127.0.0.1:3000',
        'pathRewrite': {
          '/api': ''
        }
      });

  gulp.task('run-nodemon', function runNodemon() {

    nodemon({
      'script': serverIndexFile
    })
    .on('restart', function onRestart() {

      /* eslint-disable no-console */
      console.log('restarted!');
      /* eslint-enable no-console */
    })
    .on('crash', function onCrash() {

      /* eslint-disable no-console */
      console.log('crashed');
      /* eslint-enable no-console */
      nodemon.emit('restart');
    });
  });

  gulp.task('run-browser-sync', function runBrowserSync(done) {

    browserSync({
      'open': true,
      'ui': false,
      'port': 8100,
      'server': {
        'baseDir': ['./www'],
        'middleware': [proxy, historyApiFallback()]
      }
    }, done);
  });

  gulp.task('serve', ['watch'], function onServe(done) {

    return runSequence('run-nodemon', ['run-browser-sync'], done);
  });
}(console, __dirname, require));
