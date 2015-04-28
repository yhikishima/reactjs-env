// gulpfile.js
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

gulp.task.('clean', function(cb) {
  var del = require('del');
  del(['./dist']);
  cb();
});

gulp.task('build', function() {
  var browserify = require('browserify');
  var source     = require( 'vinyl-source-stream' );
  var buffer     = require( 'vinyl-buffer' );

  return browserify(
      './src/js/main.js',
      {
        debug: true,
        transform: [ 'reactify', 'debowerify' ]
      }
    )
    .bundle()
    .pipe( source( 'app.js' ) )
    .pipe( buffer() )
    .pipe( $.sourcemaps.init( { loadMaps: true } ) )
    .pipe( $.uglify() )
    .pipe( $.sourcemaps.write( './' ) )
    .pipe( gulp.dest( './src/js' ) );

});

gulp.task('watch', ['build'], function() {
  gulp.watch([
    './src/js/*.js',
    '!./src/js/app.js'
  ], [ 'build' ]);
});

gulp.task('serve', ['watch'], function() {
  var connect     = require( 'connect' );
  var serveStatic = require( 'serve-static' );
  var app = connect();
  app.use( serveStatic( __dirname ) );
  app.listen( 8080 );
});

gulp.task('default', ['build']);
