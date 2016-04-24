'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var Server = require('karma').Server;

gulp.task('test', ['test:lib', 'test:public']);

gulp.task('test:lib', function () {
  gulp.src('test/lib/**/*.spec.js', {read: false})
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('test:public', function (done) {
  var server = new Server({
    configFile: __dirname + '/test/public/karma.conf.js',
    singleRun: true
  });

  server.on('run_complete', function (browsers, results) {
    done(results.error ? 'There are test failures' : null);
  });

  server.start();
});
