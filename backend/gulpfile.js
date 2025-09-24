////////////////////////////////
// Setup
////////////////////////////////

// Gulp and package
const {src, dest, parallel, series, watch} = require('gulp');
const pjson = require('./package.json');

// Plugins
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const tildeImporter = require('node-sass-tilde-importer');
const cssnano = require('cssnano');
const pixrem = require('pixrem');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;

// Relative paths function
function pathsConfig(appName) {
    this.app = `./${pjson.name}`;
    const vendorsRoot = 'node_modules';

    return {
        vendorsJs: [
            `${vendorsRoot}/@popperjs/core/dist/umd/popper.js`,
            `${vendorsRoot}/bootstrap/dist/js/bootstrap.js`,
            `${vendorsRoot}/smooth-scroll/dist/smooth-scroll.min.js`,
            `${vendorsRoot}/aos/dist/aos.js`,
            `${vendorsRoot}/parallax-js/dist/parallax.min.js`,
            `${vendorsRoot}/jarallax/dist/jarallax.min.js`,
            `${vendorsRoot}/chart.js/dist/chart.umd.js`,
            `${vendorsRoot}/nouislider/dist/nouislider.min.js`,
            `${vendorsRoot}/flatpickr/dist/flatpickr.min.js`,
            `${vendorsRoot}/flatpickr/dist/plugins/rangePlugin.js`,
            `${vendorsRoot}/img-comparison-slider/dist/index.js`,
            `${vendorsRoot}/leaflet/dist/leaflet.js`,
            `${vendorsRoot}/nouislider/dist/nouislider.min.js`,
            `${vendorsRoot}/shufflejs/dist/shuffle.min.js`,
            `${vendorsRoot}/simplebar/dist/simplebar.js`,
            `${vendorsRoot}/swiper/swiper-bundle.min.js`,
            `${vendorsRoot}/@lottiefiles/lottie-player/dist/lottie-player.js`,
            `${vendorsRoot}/lightgallery/lightgallery.min.js`,
            `${vendorsRoot}/lightgallery/plugins/zoom/lg-zoom.min.js`,
            `${vendorsRoot}/lightgallery/plugins/fullscreen/lg-fullscreen.min.js`,
            `${vendorsRoot}/lightgallery/plugins/video/lg-video.min.js`,
            `${vendorsRoot}/lightgallery/plugins/thumbnail/lg-thumbnail.min.js`,
            `${vendorsRoot}/imagesloaded/imagesloaded.pkgd.js`,
            `${vendorsRoot}/@fullcalendar/core/index.global.js`,
            `${vendorsRoot}/@fullcalendar/bootstrap5/index.global.js`,
            `${vendorsRoot}/@fullcalendar/daygrid/index.global.js`,
            `${vendorsRoot}/@fullcalendar/timegrid/index.global.js`,
            `${vendorsRoot}/@fullcalendar/list/index.global.js`,
            `${vendorsRoot}/timezz/dist/timezz.js`,
            `${vendorsRoot}/cleave.js/dist/cleave.min.js`,
            `${vendorsRoot}/prismjs/components/prism-core.min.js`,
            `${vendorsRoot}/prismjs/components/prism-markup.min.js`,
            `${vendorsRoot}/prismjs/components/prism-clike.min.js`,
            `${vendorsRoot}/prismjs/plugins/toolbar/prism-toolbar.min.js`,
            `${vendorsRoot}/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js`,
            `${vendorsRoot}/prismjs/plugins/line-numbers/prism-line-numbers.min.js`,
        ],
        vendorsCSS: [
            `${vendorsRoot}/flatpickr/dist/flatpickr.css`,
            `${vendorsRoot}/swiper/swiper-bundle.min.css`,
            `${vendorsRoot}/nouislider/dist/nouislider.min.css`,
            `${vendorsRoot}/img-comparison-slider/dist/styles.css`,
            `${vendorsRoot}/aos/dist/aos.css`,
            `${vendorsRoot}/lightgallery/css/lightgallery-bundle.min.css`,
            `${vendorsRoot}/leaflet/dist/leaflet.css`,
            `${vendorsRoot}/jarallax/dist/jarallax.min.css`,
            `${vendorsRoot}/simplebar/dist/simplebar.min.css`,
            `${vendorsRoot}/prismjs/themes/prism.min.css`,
            `${vendorsRoot}/prismjs/plugins/toolbar/prism-toolbar.min.css`,
            `${vendorsRoot}/prismjs/plugins/line-numbers/prism-line-numbers.min.css`,
        ],
        app: this.app,
        templates: `${this.app}/templates`,
        css: `${this.app}/static/css`,
        scss: `${this.app}/static/scss`,
        fonts: `${this.app}/static/fonts`,
        images: `${this.app}/static/img`,
        js: `${this.app}/static/js`,
    };
}

const paths = pathsConfig();

////////////////////////////////
// Tasks
////////////////////////////////
const processCss = [
    autoprefixer(), // adds vendor prefixes
    pixrem(), // add fallbacks for rem units
];

const minifyCss = [
    cssnano({preset: 'default'}), // minify result
];

// Styles autoprefixing and minification
function styles() {


    return src(`${paths.scss}/theme.scss`)
        .pipe(
            sass({
                importer: tildeImporter,
                includePaths: [paths.scss],
            }).on('error', sass.logError),
        )
        .pipe(plumber()) // Checks for errors
        // .pipe(postcss(processCss))
        .pipe(dest(paths.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(postcss(minifyCss)) // Minifies the result
        .pipe(dest(paths.css));
}

// Javascript minification
function scripts() {
    return src([`${paths.js}/customizer.js`])
        .pipe(plumber()) // Checks for errors
        .pipe(uglify()) // Minifies the js
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.js));
}

// Vendor Javascript minification
function vendorScripts() {
    return src(paths.vendorsJs, {sourcemaps: true})
        .pipe(concat('vendors.js'))
        .pipe(dest(paths.js))
        .pipe(plumber()) // Checks for errors
        .pipe(uglify()) // Minifies the js
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.js, {sourcemaps: '.'}));
}

// Vendor CSS minification
function vendorStyles() {
    return src(paths.vendorsCSS, {sourcemaps: true})
        .pipe(concat('vendors.css'))
        .pipe(plumber()) // Checks for errors
        .pipe(postcss(processCss))
        .pipe(dest(paths.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(postcss(minifyCss)) // Minifies the result
        .pipe(dest(paths.css));
}

// Watch
function watchPaths() {
    watch(`${paths.scss}/**/*.scss`, styles);
    watch([`${paths.js}/**/*.js`, `!${paths.js}/**/*.min.js`], scripts);
}

// Generate all assets
const generateAssets = parallel(styles, scripts, vendorScripts, vendorStyles);

// Set up dev environment
const dev = parallel(watchPaths);

exports.default = series(generateAssets, dev);
exports['generate-assets'] = generateAssets;
exports['dev'] = dev;
