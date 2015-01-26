var gulp = require('gulp');
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');
var sass = require('gulp-ruby-sass');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var size = require('gulp-size');
var hb = require('gulp-hb');
var frontMatter = require('gulp-front-matter');
var del = require('del');
var runSequence = require('run-sequence');
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

// style task
gulp.task('style', function() {
    return gulp.src('app/sass/*.scss')
        .pipe(plumber())
        .pipe(sass({
            "sourcemap=none": true
        }))
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions'],
                cascade: false
            },
            minifier: false,
        }))
        .pipe(csscomb())
        .pipe(size())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({
            stream: true
        }));
});

// CSS Optimize task
gulp.task('csso', function() {
    console.log("CSS Optimized!");
    return gulp.src('app/css/style.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});

// imagemin task
gulp.task('imagemin', function() {
    return gulp.src('app/images/**/*.+(jpg|png|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// minify JS
gulp.task('uglify', function() {
    return gulp.src('app/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// minify HTML
gulp.task('minify-html', function() {
    var opts = {
        comments: true,
        spare: true
    };

    return gulp.src(['app/**/*.html', '!app/templates/**/*.html'])
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist'));
});

// handlebars task
gulp.task('hb', function() {
    return gulp.src('app/templates/pages/**/*.html')
        .pipe(frontMatter())
        .pipe(hb({
            // data: '',
            // helpers: [],
            partials: [
                'app/templates/partials/*.hbs'
            ]
        }))
        .pipe(gulp.dest('app'))
        .pipe(reload({
            stream: true
        }));
});

// watch task
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(['app/sass/*.scss'], ['style']);
    gulp.watch(['app/images/**/*.+(jpg|png|gif|svg)'], reload);
    gulp.watch(['app/templates/pages/**/*.html', 'app/templates/partials/*.hbs'], ['hb']);
});

gulp.task('optimize', function() {
    runSequence(
        'csso', // 1
        'minify-html' // 2
    );
});

// build task
gulp.task('build', ['optimize', 'imagemin', 'uglify']);

// clean task
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

// default task
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
