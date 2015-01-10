'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');

var paths = {
    rebuild: [],
    lint: [
        // '.enb/*.js',
        'blocks/**/*.js',
        'bundles/*/blocks/**/*.js',
        'controllers/**/*.js',
        'lib/**/*.js',
        // 'middleware/**/*.js',
        'models/**/*.js',
        'updates/*.js',
        // 'test/**/*.js',
        '*.js'
    ]
};

gulp.task('jscs', function () {
    return gulp.src(paths.lint)
        .pipe(jscs());
});

gulp.task('eslint', function () {
    return gulp.src(paths.lint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('lint', ['jscs', 'eslint']);
