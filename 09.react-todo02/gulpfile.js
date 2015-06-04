var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
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

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8888,
    livereload: true
  });
});

gulp.task( 'copy', function() {
  gulp.src( './src/*.html' )
    .pipe( gulp.dest( './dist' ) );
});

gulp.task('serve', [
  'copy',
  'browserify',
  'connect'
]);