'use strict';

var gulp = require('gulp');
var source = require("vinyl-source-stream");
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var reactify = require('reactify');
var sass = require('gulp-sass');

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , ignore: ['node_modules/']
  , env: { 'NODE_ENV': 'development' }
  })
});

// Compile jsx into Javascript.
gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // Use the reactify transform.
  b.add('src/js/script.js');
  return b.bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('src/**/*.*', ['browserify']);
});

// Compile Sass into css.
gulp.task('scss', function() {
  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('scss:watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('default', ['nodemon', 'watch']);
