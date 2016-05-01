'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', ['test:lib']);

gulp.task('test:lib', function () {
  gulp.src('test/lib/**/*.spec.js', {read: false})
    .pipe(mocha({
      reporter: 'spec'
    }));
});
