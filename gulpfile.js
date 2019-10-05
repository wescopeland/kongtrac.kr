var gulp = require('gulp'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    bust = require('gulp-buster'),
    watch = require('gulp-watch');

function clean() {
    return del(['./client/dist']);
}

gulp.task(
    'scripts',
    gulp.series(clean, function() {
        return gulp
            .src([
                './client/app/**/*.module.js',
                './client/app/**/*.js',
                '!./client/app/**/*.spec.js'
            ])
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(ngAnnotate({ add: true }))
            .pipe(gulp.dest('./client/dist/js'));
    })
);

gulp.task('default', gulp.series(clean, 'scripts'));

// gulp.task('watch', function() {
//     gulp.watch('./client/app/**/*.js', ['scripts']);
// });
