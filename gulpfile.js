'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');


gulp.task('sass', function () {
  console.log('sass task started');
  return gulp.src('./public/style/scss/**/*.scss')
    .pipe(sass({ includePaths : ['./public/lib/foundation/scss'], errLogToConsole: true }).on('error', sass.logError))
    .pipe(gulp.dest('./public/style/css'));
});


gulp.task('watch', function() {
  console.log('watch started');
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch('./public/style/scss/**/*.scss', ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// gulp.task('nodemon', function () {
//   nodemon({
//     script: 'server.js',
//     ext: 'js html',
//     env: { 'NODE_ENV': 'development' }
//   });
// });

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['sass', 'watch'])
    .on('change', ['sass', 'watch'])
    .on('restart', function () {
      console.log('nodemon restarted!');
    });
});

gulp.task('default', ['nodemon']);
// gulp.task('default', ['nodemon', 'sass', 'watch']);
