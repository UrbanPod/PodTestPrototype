var gulp = require('gulp');

// var reactify = require('reactify');
var browserify = require('gulp-browserify');

gulp.task('js', function() {
  return gulp.src('src/js/main.js')
    .pipe(browserify({ debug: true }))
    .pipe(gulp.dest('builds/development/js'));
});
