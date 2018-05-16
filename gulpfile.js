// UTILS
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
// HTML
var gulpImport = require("gulp-html-import");
var htmlmin = require("gulp-htmlmin");
// CSS
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
const syntaxScss = require('postcss-scss');
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
const stylelint = require('stylelint');
// JS
var browserify = require("browserify");
var uglify = require("gulp-uglify");
// IMG
var imagemin = require("gulp-imagemin");
var responsive = require("gulp-responsive");

// source and distribution folder
const origin = './';
const source = './src/';
const dest = './dist/';

gulp.task('stylelint', () => {
	return gulp.src(source + 'scss/*.scss')
		.pipe(postcss([
			stylelint()
		], {
			syntax: syntaxScss,
		}));
});

gulp.task('sass', ['stylelint'], () => {
    gulp.src(source + 'scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', (error) => {
            return notify().write(error);
        }))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(sourcemaps.write(origin))
        .pipe(gulp.dest(dest + 'css/'))
        .pipe(browserSync.stream())
        .pipe(notify("SASS Compilado 🤘🏻"))
});


gulp.task('html', () => {
    gulp.src(source + '*.html')
        .pipe(gulpImport(source + 'components/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream())
        .pipe(notify("HTML importado"));
});

gulp.task('js', () => {
    gulp.src(source + 'js/main.js')
        .pipe(tap((file) => {
            file.contents = browserify(file.path, {debug: true})
                            .transform('babelify', {presets: ['es2015']})
                            .bundle()
                            .on('error', (error) => {
                                return notify().write(error);
                            });
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write(origin))
        .pipe(gulp.dest(dest + 'js/'))
        .pipe(browserSync.stream())
        .pipe(notify("JS Compilado"));
});

gulp.task('img', () => {
    gulp.src(source + 'img/*')
        // .pipe(responsive({
        //     '*': [
        //         { width: 150, rename: { suffix: "-150px"}},
        //         { width: 250, rename: { suffix: "-250px"}},
        //         { width: 300, rename: { suffix: "-300px"}}
        //     ]
        // }))
        .pipe(imagemin())
        .pipe(gulp.dest(dest + 'img/'))
});

gulp.task('default', ['img', 'html', 'sass', 'js'], () => {

	browserSync.init({ proxy: 'http://127.0.0.1:3100/' });
	
    gulp.watch([source + 'scss/*.scss', source + 'scss/**/*.scss'], ['sass']);
    gulp.watch([source + '*.html', source + '**/*.html'], ['html']);
    gulp.watch([source + 'js/*.js', source + 'js/**/*.js'], ['js']);
});