var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var transform   = require('vinyl-transform');
var merge       = require('merge-stream');
var runSequence = require('run-sequence');
var saveLicense = require('uglify-save-license');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');
var proxy       = require('proxy-middleware');
var reload      = browserSync.reload;
var del         = require('del');
var pngquant    = require('imagemin-pngquant');
var assign      = require('lodash.assign');
var fs          = require('fs');

var path = {
  assets: 'assets',
  tmp: '.tmp',
  public: 'public'
};

gulp.task('eslint', function() {
  return gulp.src( path.assets + '/js//**/*.js' )
    .pipe( $.eslint() )
    .pipe( $.eslint.format() )
    .pipe( $.eslint.failOnError());
});

// gulp.task('sass', function() {
//   return gulp.src(path.assets + '/css/*.scss')
//     .pipe($.plumber())
//     .pipe($.sass.sync().on('error', $.sass.logError))
//     .pipe(gulp.dest(path.tmp + '/css'));
// });

// gulp.task('cssOptim', function() {
//   return gulp.src(path.tmp + '/css/*.css')
//     .pipe($.pleeease({
//       fallbacks: {
//         autoprefixer: ['last 2 versions']
//       },
//       optimizers: {
//         minifier: true
//       }
//     }))
//     .pipe(gulp.dest(path.tmp + '/css/'));
// });

// gulp.task('sprite:pc', function () {
//   var spriteData = gulp.src(path.assets + '/img/pc/sprites/*.png').pipe(spritesmith({
//     imgName: 'sprite.png',
//     cssName: '_sprite-data.scss',
//     imgPath: '/img/pc/sprite.png',
//     cssFormat: 'scss',
//     engine: 'pngsmith'
//   }));
//   return merge(
//     spriteData.img.pipe(gulp.dest(path.tmp + '/img/pc')),
//     spriteData.css.pipe(gulp.dest(path.assets + '/css/pencil/pc/var')),
//     spriteData.css.pipe(gulp.dest(path.assets + '/css/sharp-pencil/pc/var'))
//   );
// });

// gulp.task('sprite:sp', function () {
//   var spriteData = gulp.src(path.assets + '/img/sp/sprites/*.png').pipe(spritesmith({
//     imgName: 'sprite.png',
//     cssName: '_sprite-data.scss',
//     imgPath: '/img/sp/sprite.png',
//     cssFormat: 'scss',
//     engine: 'pngsmith'
//   }));
//   return merge(
//     spriteData.img.pipe(gulp.dest(path.tmp + '/img/sp')),
//     spriteData.css.pipe(gulp.dest(path.assets + '/css/pencil/sp/var')),
//     spriteData.css.pipe(gulp.dest(path.assets + '/css/sharp-pencil/sp/var'))
//   );
// });

gulp.task( 'browserify:pc', function() {
    return jscompile( false, 'pc' );
} );

gulp.task( 'watchify:pc', function() {
    return jscompile( true, 'pc' );
} );

gulp.task( 'browserify:sp', function() {
    return jscompile( false, 'sp' );
} );

gulp.task( 'watchify:sp', function() {
    return jscompile( true, 'sp' );
} );

function jscompile ( isWatch, userAgent ) {
  var bundler;
  var vendors = [
    'jquery',
    'underscore',
    'react'
  ];
  var customOptions = {
    entries: [path.assets + '/js/app.js'],
    require: vendors
  };
  var bundlerOptions = assign({}, watchify.args, customOptions);

  if ( isWatch ) {
    bundler = watchify( browserify(bundlerOptions) );
  } else {
    bundler = browserify(bundlerOptions);
  }

  function rebundle() {
    return bundler
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source('app.js'))
      .pipe(gulp.dest(path.tmp + '/js'))
    }
    bundler.on( 'update', function() {
      rebundle();
    } );
    bundler.on( 'log', function( message ) {
      console.log( message );
    });

    return rebundle();
}

gulp.task('uglify', function() {
  return gulp.src(path.tmp + '/js/*.js')
    .pipe($.uglify({
      preserveComments: saveLicense
    }))
    .pipe(gulp.dest(path.tmp + '/js'));
});

gulp.task('imageOptim', function() {
  return gulp.src(path.tmp + '/img/**/*.png')
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant({
        quality: 60-80,
        speed: 1
      })]
    }))
    .pipe(gulp.dest(path.tmp + '/img'));
});

gulp.task('copy:dev', function() {
  return gulp.src([
      path.assets + '/**/*.!(scss|js|md)',
      '!' + path.assets + '/img/*/sprites/**'
    ])
    .pipe(gulp.dest(path.tmp));
});

gulp.task('clean:tmp', function(cb) {
  del([
    path.tmp
  ], cb);
});

gulp.task('clean:mock', function(cb) {
  del([
    path.tmp + '/html'
  ], cb);
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(path.assets + '/js/**/*.js', ['watchify:pc'/*, 'watchify:sp', 'eslint'*/]);
  gulp.watch(path.assets + '/**/*.html', ['copy:dev']);
});

gulp.task('browser-sync', function() {
  var url = require('url');
  var proxyOptions = url.parse('http://localhost:3000/api');
  proxyOptions.route = '/api';

  browserSync({
    port: 4000,
    server: {
      baseDir: path.tmp// ,
      // middleware: [proxy(proxyOptions)],
    },
    startPath:'/html/'
  });
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:tmp',
    ['copy:dev', 'browserify:pc'],
    callback
  );
});

gulp.task('serve', function() {
  runSequence(
    'build',
    'watch'
  );
});

gulp.task('dist', function() {
  runSequence(
    'build',
    // 'clean:mock',
    'cssOptim',
    'imageOptim',
    'uglify'
  );
});
