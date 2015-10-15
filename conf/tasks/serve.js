/*global console,__dirname,require*/
(function serveTask(console, __dirname, require) {
  'use strict';

  var gulp = require('gulp')
    , path = require('path')
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

  gulp.task('serve', ['watch'], function onServe(done) {
    nodemon({
      'script': serverIndexFile
    })
    .on('restart', function onRestart() {

      console.log('restarted!');
    })
    .on('crash', function onCrash() {

      console.log('crashed');
      nodemon.emit('restart');
    });

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
}(console, __dirname, require));
