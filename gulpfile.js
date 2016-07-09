var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var selenium = require('selenium-standalone');
var mocha = require('gulp-mocha');

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
 * Create oracle builds.
 */
gulp.task('default', tasks);


/**
 * Watch for changes.
 */
gulp.task('watch', function(){
    gulp.watch(watch, tasks);
});








////
gulp.task('serve:test', function (done) {
  browserSync({
    logLevel: 'silent',
    notify: false,
    open: false,
    port: 8000,
    server: {
      baseDir: ['./']
    },
    ui: false
  }, done);
});


gulp.task('selenium', function (done) {
  // selenium.install({
  //   logger: function (message) { }
  // }, function (err) {
  //   if (err) return done(err);

    selenium.start(function (err, child) {
      if (err) return done(err);
      selenium.child = child;
      done();
    });
  // });
});


gulp.task('integration', ['serve:test', 'selenium'], function () {
  return gulp.src('tests/e2e/desktop.js', {read: false})
    .pipe(mocha());
});


gulp.task('test', ['integration'], function () {
  selenium.child.kill();
  browserSync.exit();
});
