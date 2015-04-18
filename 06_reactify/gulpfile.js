var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');

gulp.task('browserify', function(){
  var b = browserify({
    entries: ['./src/main.js'],
    transform: [reactify]
  });
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    livereload: true
  });
});

gulp.task('default', [
  'browserify',
  'connect'
]);