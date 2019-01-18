const { src, dest, watch, parallel, series } = require ("gulp");
const sass = require('gulp-sass'); // Needed to run SCSS/Sass preprocessor
const browserSync = require('browser-sync').create(); // Needed to run Live Reload
const imagemin = require('gulp-imagemin'); // Needed to Optimize Images
const connect = require('gulp-connect-php');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const setDefaultBrowser = require('set-default-browser');


// Browser Sync Start
function browserSyncInitialization() {
    setDefaultBrowser("Firefox Developer Edition");
    connect.server({}, function () {
        browserSync.init({
            proxy: "127.0.0.1:8888/woazoo/public/index.php/listing"
        });
    });
}
exports.browserSyncInitialization = browserSyncInitialization;



// Browser Sync Reload
function browserSyncReload() {
    browserSync.reload();
}
exports.browserSyncReload = browserSyncReload;



// Browser Sync Stream
function browserSyncStream() {
    browserSync.stream();
}
exports.browserSyncStream = browserSyncStream;



// Preprocessor task
function exportCss() {
    return (
        src("./src/Repository/sass/style.scss")
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())

        // Use sass with the files found, and log any errors
        .pipe(sass())
        .on("error", sass.logError)

        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())

        // What is the destination for the compiled file?
        .pipe(dest("./public/css"))

        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream())
    );
}
exports.exportCss = exportCss;


// Image Cache Optimizer
function imageOptimization() {
    return (
        src('./src/Repository/img/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins : [
                    {removeComments: true},
                    {removeEmptyAttrs: true},
                    {removeDesc: true},
                    {removeTitle: true},
                    {removeViewBox: false}
                ]
            })
        ],{verbose: true}
        ))
        .pipe(dest('./public/img'))
    );
}
exports.imageOptimization = imageOptimization;


// Concatenate & minify Js
function exportJs() {
    return (
        src("./src/Repository/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(dest("./public/js"))
    );
}
exports.exportJs = exportJs;


function watching() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        proxy: "127.0.0.1:8888/woazoo/public/index.php/listing"
    });

    watch("./src/Repository/sass/**/*.scss", exportCss);
    watch("./templates/**/*.html.twig", browserSyncReload);
    watch('./src/Repository/img/**/*.*', series(imageOptimization, browserSyncReload));
}
exports.watch = watching;