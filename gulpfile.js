'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    nodemon = require('gulp-nodemon'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    source = require("vinyl-source-stream"),
    util = require("gulp-util");

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

gulp.task('node:kill', shell.task([
  'pkill node'
]));

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , ignore: ['node_modules/']
  , env: { 'NODE_ENV': 'development' }
  })
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
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
  gulp.watch('src/**/*', ['browserify']);
});

// Compile Sass into css.
gulp.task('scss', function() {

  var processors = [
    autoprefixer({browsers: ['last 2 version']})
  ];

  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('public'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(minifycss())
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['lint', 'node:kill','nodemon', 'watch']);
