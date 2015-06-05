var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var source = require("vinyl-source-stream");
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var reactify = require('reactify');

gulp.task('browserify', function(){
  var b = browserify({
    entries: ['./src/js/app.js'],
    transform: [reactify]
  });
  return b.bundle()
    .pipe(source('app.js'))
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
    .pipe( plumber() )
    .pipe( stylus( {
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