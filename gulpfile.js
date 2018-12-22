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

gulp.task('scripts', function() {
    return (
        gulp
            .src([
                './client/app/**/*.module.js',
                './client/app/**/*.js',
                '!./client/app/**/*.spec.js'
            ])
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            //.pipe(sourcemaps.init())
            //.pipe(concat('app.min.js', {newLine: ';'}))
            .pipe(ngAnnotate({ add: true }))
            //.pipe(uglify({mangle: true}))
            //.pipe(sourcemaps.write())
            .pipe(gulp.dest('./client/dist/js'))
    );
    //.pipe(bust())
    //.pipe(gulp.dest('./client'))
});

gulp.task('clean', function(callback) {
    del(['./client/dist'], callback);
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

gulp.task('watch', function() {
    gulp.watch('./client/app/**/*.js', ['scripts']);
});
