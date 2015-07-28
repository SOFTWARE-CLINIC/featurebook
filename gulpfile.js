"use strict";

var gulp     = require('gulp'),
    jshint   = require('gulp-jshint'),
    stylish  = require('jshint-stylish'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    Server   = require('karma').Server;

gulp.task('lint', ['lint:lib', 'lint:public']);
gulp.task('lint:lib', ['lint:src:lib', 'lint:test:lib']);
gulp.task('lint:public', ['lint:src:lib', 'lint:test:lib']);

gulp.task('lint:src:lib', function () {
  return gulp.src('./lib/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint:test:lib', function () {
  return gulp.src('./test/lib/**/*.spec.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint:src:public', function () {
  return gulp.src('./public/scripts/**.*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint:test:public', function () {
  return gulp.src('./test/public/scripts/**.*.spec.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', ['test:lib', 'test:public']);

gulp.task('test:lib', function (done) {
  gulp.src('lib/**/*.js')
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
          gulp.src('./test/lib/**/*.spec.js', {read: false})
            .pipe(mocha({
                    reporter: 'mocha-junit-reporter'
                  }))
            .pipe(istanbul.writeReports({
                    dir:        './coverage',
                    reporters:  ['lcov'],
                    reportOpts: {dir: './coverage'}
                  }))
            .pipe(istanbul.enforceThresholds({thresholds: {global: 10}}))
            .on('end', done);
        });
});

gulp.task('test:public', function (done) {
  new Server({
    configFile: __dirname + '/test/public/karma.conf.js',
    singleRun:  true
  }, done).start();
});