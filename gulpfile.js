var Promise = require('es6-promise').Promise;
var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var filter = require('gulp-filter');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('clean', function(){
  return gulp
    .src('dist/**/*.*')
    .pipe(clean());
});

gulp.task('copy', function(){
  var staticFiles = [
    'src/index.html',
    'src/assets/**/*'
  ];

  var assetFilter = filter('src/assets/**/*', {restore: true});
  var indexFilter = filter('src/index.html', {restore: true});

  return gulp.src(staticFiles)
    .pipe(indexFilter)
    .pipe(gulp.dest('dist'))
    .pipe(indexFilter.restore)
    .pipe(assetFilter)
    .pipe(gulp.dest('dist/assets'))
    .pipe(assetFilter.restore);
});

gulp.task('webpack', function(){
  return gulp.src('src/index.js')
    .pipe(webpackStream(require('./webpack.config.js')))
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack-dev-server', function(){
  // Start a webpack-dev-server
  var compiler = webpack(require('./webpack.config'));

  new WebpackDevServer(compiler, {
    // server and middleware options
    contentBase: 'dist/',
    publicPath: '/'
  }).listen(8080, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    console.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});

gulp.task('build', function(){
  runSequence(
    'clean',
    'copy',
    'webpack'
  )
});

gulp.task('serve', function(){
  runSequence(
    'clean',
    'copy',
    'webpack-dev-server'
  )
});