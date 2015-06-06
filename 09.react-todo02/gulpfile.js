var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var source = require("vinyl-source-stream");
var buffer = require( 'vinyl-buffer' );
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var reactify = require('reactify');

gulp.task('browserify', function(){
  var b = browserify({
    entries: ['./src/js/app.js'],
    transform: [reactify],
    debug: true
  });
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './dist/'
    },
    open: false
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task( 'copy', function() {
  return gulp.src(
    [
      './src/*.html'
    ],{
      base: 'src'
    }).pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function() {
  return gulp.src([
      './src/css/!(_)*.styl'
    ])
    .pipe(plumber())
    .pipe(stylus( {
      compress: true
    }))
    .pipe( gulp.dest('./dist/css/') );
});

gulp.task( 'watch', function() {
  gulp.watch('./src/css/*.styl', ['stylus', 'bs-reload']);
  gulp.watch('./src/js/*.js', ['browserify', 'bs-reload']);
  gulp.watch('./src/*.html', ['copy', 'bs-reload']);
});

gulp.task('serve', [
  'copy',
  'stylus',
  'browserify',
  'browserSync',
  'watch'
]);