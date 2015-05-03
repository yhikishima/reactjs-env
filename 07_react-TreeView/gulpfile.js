// gulpfile.js
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

gulp.task('clean', function(cb) {
  var del = require('del');
  del(['./dist']);
  cb();
});

gulp.task('js', function() {
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

gulp.task( 'copy', [ 'build', 'clean' ], function() {
  return gulp.src(
      [ 'src/fonts/**', 'src/js/app.js' ],
      { base: 'src' }
    )
    .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'release', [ 'copy' ], function() {
  var assets = $.useref.assets();
  gulp.src( './src/*.html' )
    .pipe( assets )
    .pipe( $.if( '*.css', $.minifyCss() ) )
    .pipe( assets.restore() )
    .pipe( $.useref() )
    .pipe( gulp.dest( './dist' ) );
} );

gulp.task('watch', ['build'], function() {
  gulp.watch([
    './src/js/*.js',
    '!./src/js/app.js'
  ], [ 'js' ]);
});

gulp.task( 'build', [ 'js' ] );

gulp.task('serve', ['watch'], function() {
  var connect = require('gulp-connect');
  connect.server({
    root: 'dist',
    port: 7000,
    livereload: true
  });

});

gulp.task('default', ['watch']);
