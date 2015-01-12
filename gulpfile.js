'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

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
        'test/**/*.js',
        '*.js'
    ],
    test: [
        'test/*.js'
    ],
    coverage: [
        'controllers/**/*.js',
        'lib/**/*.js',
        // 'middleware/**/*.js',
        'models/**/*.js',
        '*.js'
    ]
};

// Lint
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

// Test
gulp.task('mocha', function () {
    return gulp.src(paths.test, {read: false})
        .pipe(mocha());
});

gulp.task('istanbul', function (done) {
    gulp.src(paths.coverage)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(paths.test)
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .on('end', done);
        });
});

gulp.task('test', ['lint', 'istanbul']);
