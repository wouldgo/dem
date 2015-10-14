/*global require*/
(function buildTask(require) {
  'use strict';

  var gulp = require('gulp')
    , changed = require('gulp-changed')
    , plumber = require('gulp-plumber')
    , babel = require('gulp-babel')
    , sourcemaps = require('gulp-sourcemaps')
    , ngAnnotate = require('gulp-ng-annotate')
    , less = require('gulp-less')
    , LessPluginCleanCSS = require('less-plugin-clean-css')
    , htmlMin = require('gulp-minify-html')
    , ngHtml2Js = require('gulp-ng-html2js')
    , runSequence = require('run-sequence')
    , browserSync = require('browser-sync')
    , paths = require('../paths')
    , compilerOptions = require('../babel-confs')
    , cleancss = new LessPluginCleanCSS({
      'advanced': true,
      'keepSpecialComments': 0,
      'keepBreaks': false
    });

  gulp.task('build', function onBuild(done) {
    return runSequence('clean', ['less', 'html', 'es6', 'move'], done);
  });

  gulp.task('move', function onMove() {

    return gulp.src(paths.assets)
      .pipe(gulp.dest(paths.output));
  });

  gulp.task('es6', function onEs6() {
    return gulp.src(paths.source, {
        'base': paths.base
      })
      .pipe(plumber())
      .pipe(changed(paths.output, {
        'extension': '.js'
      }))
      .pipe(sourcemaps.init({
        'loadMaps': true
      }))
      .pipe(babel(compilerOptions))
      .pipe(ngAnnotate({
        'sourceMap': true,
        'gulpWarnings': false
      }))
      .pipe(sourcemaps.write('/sourcemaps', {
        'sourceRoot': '/src'
      }))
      .pipe(gulp.dest(paths.output));
  });

  gulp.task('html', function onHTML() {
    return gulp.src(paths.templates)
      .pipe(plumber())
      .pipe(changed(paths.output, {
        'extension': '.html'
      }))
      .pipe(htmlMin({
        'empty': true,
        'spare': true,
        'quotes': true
      }))
      .pipe(ngHtml2Js({
        'template': [
          'import angular from \'angular\';\n',
          'export default angular.module(\'<%= moduleName %>\', []).run([\'$templateCache\', function($templateCache) {\n',
          '   $templateCache.put(\'<%= template.url %>\',\n    \'<%= template.prettyEscapedContent %>\');\n',
          '}]);\n'
        ].join('')
      }))
      .pipe(babel(compilerOptions))
      .pipe(gulp.dest(paths.output));
  });

  gulp.task('less', function onLess() {
    return gulp.src(paths.less)
      .pipe(plumber())
      .pipe(changed(paths.output, {
        'extension': '.css'
      }))
      .pipe(sourcemaps.init())
      .pipe(less({
        'plugins': [cleancss]
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.output))
      .pipe(browserSync.reload({
        'stream': true
      }));
  });
}(require));
