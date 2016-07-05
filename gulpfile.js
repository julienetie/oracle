var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');


/**
 * What we're here to do.
 */
var tasks = [
    'Build ./oracle.js',
    'Build ./oracle.min.js'
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
    './src/amd-wrapper-start.js',
    './src/oracle.src.js',
    './src/amd-wrapper-end.js'
];


/**
 * Builds ./oracle..min.js
 */
gulp.task('Build ./oracle.min.js', function() {
    gulp.src(src)
        .pipe(plumber())
        .pipe(concat('oracle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});


/**
 * Builds ./oracle.js
 */
gulp.task('Build ./oracle.js', function() {
    gulp.src(src)
        .pipe(plumber())
        .pipe(concat('oracle.js'))
        .pipe(gulp.dest('./'));
});


/**
 * Builds once and watch for changes.
 */
gulp.task('default', tasks)
    .watch(watch, tasks);
