const
    gulp  = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    cleanCss = require('gulp-clean-css'),
    nunjucksRender = require('gulp-nunjucks-render');

const paths = {
    Styles: {
        src: './app/scss/**/*.+(sass|scss)',
        images: './app/img/**/*.*',
        js: [
            './app/js/**/*.*',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/popper.js/dist/umd/popper.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './node_modules/flatpickr/dist/flatpickr.js',
            './node_modules/bootstrap-select/dist/js/*.*'
        ],
        fonts: [
            './app/fonts/**/*.*',
            './node_modules/@fortawesome/fontawesome-pro/webfonts/*.*'
        ],
        destCss: './build/css',
        destImages: './build/img',
        destJs: './build/js',
        destFonts: './build/fonts'
    },
    Nunjucks: {
        src: './app/pages/**/*.+(html|njk)',
        templateWatch: './app/templates/**/*.+(html|njk)',
        templates: './app/templates',
        dest: './build'
    },
    browserSync: {
        baseDir: './build',
        html: './build/**/*.html',
        js: './build/**/*.js',
        css: './build/**/*.css'
    }
};

function Nunjucks() {
    return gulp.src(paths.Nunjucks.src)
        .pipe(nunjucksRender({
            path: paths.Nunjucks.templates
        }))
        .on('error', onError)
        .pipe(gulp.dest(paths.Nunjucks.dest));
}

function Styles() {
    return gulp.src(paths.Styles.src)
        .pipe(sass())
        .pipe(cleanCss({compatibility: '*'}))
        .on('error', onError)
        .pipe(gulp.dest(paths.Styles.destCss))
}

function Images() {
    return gulp.src(paths.Styles.images, {allowEmpty: true})
        .on('error', onError)
        .pipe(gulp.dest(paths.Styles.destImages))
}

function Javascript() {
    return gulp.src(paths.Styles.js, {allowEmpty: true})
        .on('error', onError)
        .pipe(gulp.dest(paths.Styles.destJs))
}

function Fonts() {
    return gulp.src(paths.Styles.fonts)
        .on('error', onError)
        .pipe(gulp.dest(paths.Styles.destFonts))
}

function onError(err) {
    console.log(err);
    this.emit('end');
}

function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('server', function (done) {
    gulp.watch(paths.Styles.src, {interval: 1000, usePolling: true, delay: 500}, Styles);
    gulp.watch(paths.Nunjucks.src, {interval: 1000, usePolling: true, delay: 500}, Nunjucks);
    gulp.watch(paths.Nunjucks.templateWatch, {interval: 1000, usePolling: true, delay: 500}, Nunjucks);
    gulp.watch(paths.Styles.images, {interval: 1000, usePolling: true, delay: 500}, Images);
    gulp.watch(paths.Styles.js, {interval: 1000, usePolling: true, delay: 500}, Javascript);
    gulp.watch(paths.Styles.fonts, {interval: 1000, usePolling: true, delay: 500}, Fonts);
    gulp.watch(paths.browserSync.html, reload);
    gulp.watch(paths.browserSync.js, reload);
    gulp.watch(paths.browserSync.css, reload);
    browserSync.init({
        server: {
            baseDir: paths.browserSync.baseDir
        },
        open: false,
        notify: false
    });
    done();
});

gulp.task('build', function (done) {
    Styles();
    Images();
    Fonts();
    Javascript();
    Nunjucks();
    done();
});