// var gulp = require('gulp');
// var jshint = require('gulp-jshint');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var notify = require('gulp-notify');
// var plumber = require('gulp-plumber');
// var watch = require('gulp-watch');
// var selenium = require('selenium-standalone');
// var webdriver = require('gulp-webdriver');
// var webdriver = require('gulp-webdriver');

// /**
//  * What we're here to do.
//  */
// var tasks = [
//     'Build ./oracle.js',
//     'Build ./oracle.min.js',
//     'Build ./oracle.no-libs.js',
//     'Build ./oracle.no-libs.min.js'
// ];


// /**
//  * What we're here to do.
//  */
// var E2ETasks = [
//     'webdriverio',
//     'Build ./oracle.js',
//     'Build ./oracle.min.js',
//     'Build ./oracle.no-libs.js',
//     'Build ./oracle.no-libs.min.js'
// ];


// /**
//  * Files to watch
//  */
// var watch = [
//     './src/**.js',
//     './**.html',
// ];


// /**
//  * src files in order.
//  */
// var src = [
//     // Wrapper start.
//     './src/amd-wrapper-start.js',

//     // CustomEvents polyfill.
//     './libs/custom-events.js',

//     // Resizilla for window resize debouncing.
//     './libs/resizilla.js',

//     // Oracle.
//     './src/oracle.src.js',

//     // Wrapper end.
//     './src/amd-wrapper-end.js'
// ];


// // filter paths containing libs
// function removeLibs(value){
//     if(value.indexOf('libs') === -1){
//         return value;
//     }
// }

// // src without lib paths
// var srcNoLibs = src.filter(removeLibs);


// /**
//  * Builds ./oracle.js
//  */
// gulp.task('Build ./oracle.js', function() {
//     gulp.src(src)
//       .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
//         .pipe(jshint())
//         .pipe(jshint.reporter('jshint-stylish'))
//         .pipe(concat('oracle.js'))
//         .pipe(gulp.dest('./'))
//         .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
// });


// /**
//  * Builds ./oracle..min.js
//  */
// gulp.task('Build ./oracle.min.js', function() {
//     gulp.src(src)
//         .pipe(concat('oracle.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./'))
//         .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
// });


// /**
//  * Builds ./oracle.no-libs.js
//  */
// gulp.task('Build ./oracle.no-libs.js', function() {
//     gulp.src(srcNoLibs)
//         .pipe(concat('oracle.no-libs.js'))
//         .pipe(gulp.dest('./'))
//         .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
// });


// /**
//  * Builds ./oracle.no-libs.min.js
//  */
// gulp.task('Build ./oracle.no-libs.min.js', function() {
//     gulp.src(srcNoLibs)
//         .pipe(concat('oracle.no-libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./'))
//         .pipe(notify({ message: '<%= file.relative %> built', onLast: true }));
// });


// /**
//  * task to install the selenium-standalone server. Won't download the library if it has been done
//  * already.
//  * will also start the selenium-standalone server.
//  */
// gulp.task('selenium', (done) => {
//     selenium.install({logger: console.log}, () => {
//         selenium.start((err, child) => {
//             if (err) {
//                 return done(err);
//             }
//             selenium.child = child;
//             done();
//         });
//     });
// });


// /**
//  * requires the task selenium to be done.
//  * will start the webdriver which the config from wdio.conf.js.
//  * implementation of the error-callback to stop the selenium-server and the process itself.
//  */
// gulp.task('webdriverio', () => {
//     return gulp.src('wdio.conf.js')
//         .pipe(webdriver()).on('error', () => {
//             // selenium.child.kill();
//             process.exit(1);
//         });
// });


// /**server**/
// gulp.task('server', () => {

// });

// /**
//  * Builds once.
//  */
// gulp.task('default', tasks);


// /**
//  * Builds e2e.
//  */
// gulp.task('e2e', ['webdriverio'])//E2ETasks);


// /**
//  * Watch for changes.
//  */
// gulp.task('watch', function(){
//     gulp.watch(watch, tasks);
// });


var gulp = require('gulp');
var browserSync = require('browser-sync');
var selenium = require('selenium-standalone');
var mocha = require('gulp-mocha');


gulp.task('serve:test', function (done) {
  browserSync({
    logLevel: 'silent',
    notify: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['test']
    },
    ui: false
  }, done);
});


gulp.task('selenium', function (done) {
  selenium.install({
    logger: function (message) { }
  }, function (err) {
    if (err) return done(err);

    selenium.start(function (err, child) {
      if (err) return done(err);
      selenium.child = child;
      done();
    });
  });
});


gulp.task('integration', ['serve:test', 'selenium'], function () {
  return gulp.src('tests/e2e/**/*.js', {read: false})
    .pipe(mocha());
});


gulp.task('test', ['integration'], function () {
  selenium.child.kill();
  browserSync.exit();
});
