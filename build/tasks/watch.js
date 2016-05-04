var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var pug = require('gulp-pug');
var moment = require('moment');
var colors = require('colors');
var path = require('path');

var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['prep'], function () {
  gulp.watch(paths.source, ['build-system', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.css, ['build-css']).on('change', reportChange);
  gulp.watch([paths.pug, 'index.jade'], compilePug);
  gulp.watch(paths.sass, ['compile-sass']);
  
  gulp.watch(paths.style, function () {
    return gulp.src(paths.style)
      .pipe(browserSync.stream());
  }).on('change', reportChange);
});

gulp.task('prep', function (callback) {
  return runSequence(
    'rm-html',
    'compile-pug',
    'compile-pug-index',
    'compile-sass',
    'serve',
    callback
  );
});

gulp.task('compile-pug', function () {
  return gulp.src(paths.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('src/.'));
});

gulp.task('compile-pug-index', function () {
  return gulp.src('index.jade')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('compile-sass', function () {
  sass('scss/styles.scss', {sourcemap: true, style: 'compact'})
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('styles'));
});

var logWatchEventInfo = function (title, event) {
  var currentTime = moment(Date.now()).format('DD.MM.YY HH:mm');
  console.log('===============================================');
  console.log(currentTime.toString().bold.green + ' ' + title.bold + ': ');
  console.log('    type: '.bold + event.type);
  console.log('    path: '.bold + event.path);
};

function compilePug(event) {
  logWatchEventInfo('Pug compile', event);
  var destPath = path.relative(paths.root, event.path);
  destPath = path.dirname(destPath);
  gulp.src(event.path)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./src/' + destPath));
}


