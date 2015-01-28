// Include Gulp & tools
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch');

// Lint JavaScript
gulp.task('hint', function(){
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watch Files For Changes
gulp.task('default', function(){
  gulp.watch('js/**/*.js', ['hint']);
});
