var gulp = require('gulp');
var please = require('gulp-pleeease');
var plumber = require('gulp-plumber');
var sass = require('gulp-ruby-sass');
var csscomb = require('gulp-csscomb');
var svgmin = require('gulp-svgmin');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "app"
        },
        tunnel: true,
    });
});

gulp.task('style', function() {
    return gulp.src('app/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(please({
            minifier: false,
            rem: ["10px", {
                replace: false
            }]
        }))
        .pipe(csscomb())
        .pipe(size())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.svg')
      .pipe(svgmin())
      .pipe(size())
      .pipe(gulp.dest('app/images'));
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('default', ['browserSync'], function() {
    gulp.watch(['app/sass/*.scss'], ['style']);
    gulp.watch('app/images/**/*.svg', ['images']);
    gulp.watch(['app/*.html'], ['bs-reload']);
});
