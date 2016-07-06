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
        .pipe(plumber())
        .pipe(concat('oracle.js'))
        .pipe(gulp.dest('./'));
});


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
 * Builds ./oracle.no-libs.js
 */
gulp.task('Build ./oracle.no-libs.js', function() {
    gulp.src(srcNoLibs)
        .pipe(plumber())
        .pipe(concat('oracle.no-libs.js'))
        .pipe(gulp.dest('./'));
});


/**
 * Builds ./oracle.no-libs.min.js
 */
gulp.task('Build ./oracle.no-libs.min.js', function() {
    gulp.src(srcNoLibs)
        .pipe(plumber())
        .pipe(concat('oracle.no-libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});


/**
 * Builds once and watch for changes.
 */
gulp.task('default', tasks)
    .watch(watch, tasks);
