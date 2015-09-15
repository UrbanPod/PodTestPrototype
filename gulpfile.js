'use strict';

// General.
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var util = require("gulp-util");

// Styling.
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minifycss = require('gulp-minify-css');

// Javascript.
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

// Copy over index.html
gulp.task('copy', function () {
  gulp.src("src/index.html")
    .pipe(gulp.dest("public"));
});

// Lint Task
gulp.task('lint', function () {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass into css.
gulp.task('scss', function () {
  var processors = [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ];

  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('public'))
    .pipe(minifycss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public'));
});

// Compile jsx into Javascript.
gulp.task('browserify', function () {
  var b = browserify();
  b.transform(reactify); // Use the reactify transform.
  b.add('src/js/script.js');
  return b.bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(uglify().on('error', util.log))
    .pipe(gulp.dest('public'));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: ['node_modules/'],
    env: {
      'NODE_ENV': 'development'
    }
  })
});

gulp.task('watch', function () {
  gulp.watch('src/index.html', ['copy']);
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('src/**/*', ['lint', 'browserify']);
});

gulp.task('build', ['copy', 'lint', 'scss', 'browserify']);
gulp.task('dev', ['nodemon', 'watch']);
gulp.task('prod', ['build', 'dev']);

gulp.task('default', ['dev']);
