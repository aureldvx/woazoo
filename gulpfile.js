const { src, dest, watch, parallel, series } = require ("gulp");
const sass = require('gulp-sass'); // Needed to run SCSS/Sass preprocessor
const browserSync = require('browser-sync').create(); // Needed to run Live Reload
const imagemin = require('gulp-imagemin'); // Needed to Optimize Images
const cache = require('gulp-cache'); // Speeds up image optimze
const connect = require('gulp-connect-php');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");


// Browser Sync Start
function browserSyncInitialization() {
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
    return src('images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin())
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(dest('/public/img'));
}
exports.imageOptimization = imageOptimization;


function watching() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        proxy: "127.0.0.1:8888/woazoo/public/index.php/listing"
    });

    watch("./src/Repository/sass/**/*.scss", exportCss);
    watch("./templates/**/*.html.twig", browserSyncReload);
    watch('./src/Repository/img/*.+(png|jpg|jpeg|gif|svg)', imageOptimization);
}
exports.watch = watching;