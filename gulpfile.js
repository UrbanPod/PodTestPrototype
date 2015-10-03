'use strict';

// General.
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var util = require('gulp-util');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

// Styling.
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minifycss = require('gulp-minify-css');

// Javascript.
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

// Flags.
var isProduction = (argv.p === undefined) ? false : true;
console.log("Production mode: " + isProduction);

// Copy over index.html
gulp.task('copy', function() {
  gulp.src("src/index.html")
    .pipe(gulp.dest("public"));
  gulp.src("assets/images/*.png")
    .pipe(gulp.dest("public/images"));
});

// Lint task.
gulp.task('lint', function() {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe(eslint({
      // useEslintrc: true
    }))
    .pipe(eslint.formatEach('compact', process.stderr));
});

// Compile Sass into css.
gulp.task('scss:components', function() {
  gulp.src('src/jsx/**/*.scss', {base: 'src'})
    .pipe(flatten())
    .pipe(gulp.dest('src/scss/_components'));

  runSequence('scss');
});

// Compile Sass into css.
gulp.task('scss', function() {
  var processors = [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ];

  gulp.src('src/scss/style.scss')
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
gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify); // Use the reactify transform.
  b.add('src/js/script.js');
  return b.bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulpif(isProduction, uglify().on('error', util.log)))
    .pipe(gulp.dest('public'));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: ['node_modules/'],
    env: {
      'NODE_ENV': 'development'
    }
  })
});

// Visualize the folder structures.
gulp.task('colony', shell.task([
  'node_modules/colony/bin/colony app.js -o colony --no-modules',
  'cd colony && python -m SimpleHTTPServer 8000'
]));

gulp.task('watch', function() {
  gulp.watch('src/index.html', ['copy']);
  gulp.watch('src/jsx/**/*.scss', ['scss:components']);
  gulp.watch([
    'src/scss/**/*.scss',
    '!src/scss/{_components,_components/**}'],
  ['scss']);
  // gulp.watch('src/**/*.{js,jsx}', ['lint', 'browserify']);
  gulp.watch('src/**/*.{js,jsx}', ['browserify']);
});

gulp.task('build', ['copy', 'scss:components', 'browserify']);
gulp.task('dev', ['nodemon', 'watch']);
gulp.task('prod', ['build', 'dev']);

gulp.task('default', ['dev']);
