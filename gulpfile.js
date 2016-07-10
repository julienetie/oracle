'use strict';

var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var nightwatch = require('nightwatch');

gulp.task('serve:test', function (callback) {
  browsersync.init({
    notify: false,
    port: 8000,
    open: false,
    server: { baseDir: ['./'] },
    snippetOptions: { blacklist: ['/'] },
    ui: false
  }, function() {
    callback();
  });
});

gulp.task('test', ['serve:test'], function () {
  nightwatch.runner({
    config: 'nightwatch.json',
    env: 'default'
  }, function (passed) {
    if (passed) {
      process.exit();
    }
    else {
      process.exit(1);
    }
  });
});
