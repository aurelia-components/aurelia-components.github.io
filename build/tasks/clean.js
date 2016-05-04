var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', ['unbundle'], function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

gulp.task('rm-html', function() {
  return gulp.src(['**/*.html', '!jspm_packages/**/*', '!node_modules/**/*', '!dist/**/*'])
    .pipe(vinylPaths(del));
});
