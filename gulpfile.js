'use strict';

const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const watchify = require('watchify');

const TS_FOLDER = './src';
const TS_ENTRYPOINT = TS_FOLDER + '/app.tsx';

const EXTERNALS = ['react', 'react-dom'];
const EXTENSIONS = ['.tsx', '.ts', '.js'];

const SASS = './src/**/*.scss';

const production = !!util.env.production;

gulp.task('clean', (cb) => {
    del(['./dist/**'], cb);
});

gulp.task('vendor', () => {
    return browserify({
        debug: true,
        require: EXTERNALS
    })
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(production ? uglify() : util.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

function ts_browserify() {
    return browserify({
        debug: true,
        extensions: EXTENSIONS,
        cache: {},
        packageCache: {}
    })
        .add(TS_ENTRYPOINT)
        .plugin(tsify, {
            allowJs: true,
            jsx: 'react',
            target: 'es5',
            module: 'es5',
            noImplicitAny: true
        })
        .external(EXTERNALS)
        .transform('babelify', {
            presets: ["es2015", "react"],
            //only: TS_FOLDER,
            extensions: EXTENSIONS
        });
}

function ts_bundle(bundler) {
    function onerror(err) {
        console.error(err.toString());
        console.error(err.codeFrame);
    }

    return bundler.bundle()
        .on('error', function(err) {
            onerror(err);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(production ? uglify() : util.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
}

gulp.task('ts', () => {
    return ts_bundle(ts_browserify());
});

gulp.task('ts:watch', () => {
    let bundler = watchify(ts_browserify());
    let rebundle = () => {
        ts_bundle(bundler);
    };

    bundler.on('update', () => {
        console.log(':: Bundling,', new Date());
        rebundle();
    });

    rebundle();
});

gulp.task('sass', () => {
    gulp.src(SASS)
        .pipe(sourcemaps.init())
        .pipe(sass(
            production ? { outputStyle: 'compressed' } : {}
        ).on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('sass:watch', ['sass'], () => {
    gulp.watch(SASS, ['sass']);
});

gulp.task('connect', function() {
    connect.server({
        port: 8000,
        livereload: true
    });
});

gulp.task('watch', ['ts:watch', 'sass:watch', 'connect']);
gulp.task('default', ['clean', 'ts', 'sass', 'vendor', 'connect']);
