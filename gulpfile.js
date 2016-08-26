var gulp = require('gulp'),
  connect = require('gulp-connect'),
  mainBowerFiles = require('main-bower-files'),
  concat = require('gulp-concat'),
  concatCss = require('gulp-concat-css'),
  historyApiFallback = require('connect-history-api-fallback')();


gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true,
    middleware: function(connect, opt) {
     return [ historyApiFallback ];
   }
  });
});

gulp.task('bower:js', function () {
  return gulp.src(mainBowerFiles("**/*.js"), {
        base: './bower_components'
    })
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest('./public/app/assets/js'));
});

gulp.task('bower:css', function () {
  return gulp.src(mainBowerFiles("**/*.css"), {
        base: './bower_components'
    })
    .pipe(concatCss("vendor.css"))
    .pipe(gulp.dest('./public/app/assets/css'));
});

gulp.task('html', function () {
  gulp.src(['**/*.js','**/*.css'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  //gulp.watch(['**/*.js','**/*.css'], ['html']);
});

gulp.task('default', ['bower:css', 'bower:js', 'connect', 'watch']);
