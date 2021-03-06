'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
//var watch = require('gulp-watch');
var browsersync = require('browser-sync');
var mocha = require('gulp-mocha');
var nightwatch = require('nightwatch');

/**
 * What we're here to do.
 */
var tasks = [
    'Build ./oracle.js',
    'Build ./oracle.min.js',
    'Build ./oracle.no-libs.js',
    'Build ./oracle.no-libs.min.js'
];


/**
 * Files to watch
 */
var watch = [
    './src/**.js',
    './**.html',
];


/**
 * src files in order.
 */
var src = [
    // Wrapper start.
    './src/amd-wrapper-start.js',

    // CustomEvents polyfill.
    './libs/custom-events.js',

    // Resizilla for window resize debouncing.
    './libs/resizilla.js',

    // Oracle.
    './src/oracle.src.js',

    // Wrapper end.
    './src/amd-wrapper-end.js'
];


// filter paths containing libs
function removeLibs(value){
    if(value.indexOf('libs') === -1){
        return value;
    }
}

// src without lib paths
var srcNoLibs = src.filter(removeLibs);


/**
 * Builds ./oracle.js
 */
gulp.task('Build ./oracle.js', function() {
    gulp.src(src)
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('oracle.js'))
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
});


/**
 * Builds ./oracle..min.js
 */
gulp.task('Build ./oracle.min.js', function() {
    gulp.src(src)
        .pipe(concat('oracle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
});


/**
 * Builds ./oracle.no-libs.js
 */
gulp.task('Build ./oracle.no-libs.js', function() {
    gulp.src(srcNoLibs)
        .pipe(concat('oracle.no-libs.js'))
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
});


/**
 * Builds ./oracle.no-libs.min.js
 */
gulp.task('Build ./oracle.no-libs.min.js', function() {
    gulp.src(srcNoLibs)
        .pipe(concat('oracle.no-libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
});


/**
 * Run server for end to end test, then call test.
 */
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


/**
 * Run end to end test.
 */
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


/**
 * Create oracle builds.
 */
gulp.task('default', tasks);


/**
 * Create oracle builds.
 */
gulp.task('build', tasks);

/**
 * Watch for changes.
 */
//gulp.task('watch', function(){
//    gulp.watch(watch, tasks);
//});
