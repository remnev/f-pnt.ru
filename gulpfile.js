'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var bower = require('gulp-bower');
var vow = require('vow');
var vowFs = require('vow-fs');
var del = require('del');
var path = require('path');
var MakePlatform = require('enb/lib/make');
var runSequence = require('run-sequence');

var paths = {
    rebuild: [],
    lint: [
        '.enb/*.js',
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
    ],
    vendors: 'vendors'
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

// Vendors
gulp.task('vendors', function () {
    return bower(paths.vendors);
});

// Build
// TODO: publish to npm as gulp-clean-bembundles
gulp.task('clean', function () {
    return vowFs.glob('bundles/*')
        .then(function (bundles) {
            var clearBundles = bundles.map(function (bundle) {
                return cleanBundle(bundle);
            });

            return vow.all(clearBundles);
        });

    function cleanBundle(bundle) {
        var bundleName = bundle.split('/').pop();
        var bemdeclPath = path.join(bundle, bundleName + '.server.bemdecl.js');

        return vowFs.exists(bemdeclPath)
            .then(function (isBemdeclExist) {
                if (isBemdeclExist) {
                    // Clean the bundle
                    return vowDel([
                        path.join(bundle, '*'),
                        '!' + bemdeclPath,
                        '!' + path.join(bundle, 'blocks')
                    ]);
                }

                // remove the bundle if it hasn't a `.bemdecl.js` file
                return vowFs.removeDir(bundle);
            });
    }

    function vowDel(patterns) {
        var deferred = vow.defer();

        del(patterns, function (err, res) {
             if (err) {
                 deferred.reject(err);
             } else {
                 deferred.resolve(res);
             }
        });

        return deferred.promise();
    }
});

gulp.task('rebuild', function () {
    var make = new MakePlatform();

    return make.init(process.cwd())
        .then(function () {
            make.loadCache();

            return make.build([]);
        })
        .then(function () {
            make.saveCache();
            make.destruct();
        });
});

gulp.task('build', function (done) {
    runSequence('clean', 'vendors', 'rebuild', done);
});
