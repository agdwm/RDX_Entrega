var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var imagemin = require("gulp-imagemin");
var responsive = require("gulp-responsive");


gulp.task("sass", () => {
    gulp.src("src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", (error) => {
            return notify().write(error);
        }))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream())
        .pipe(notify("SASS Compilado 🤘🏻"))
});


gulp.task("html", () => {
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        .pipe(notify("HTML importado"));
});

gulp.task("js", () => {
    gulp.src("src/js/main.js")
        .pipe(tap((file) => {
            file.contents = browserify(file.path, {debug: true})
                            .transform("babelify", {presets: ["es2015"]})
                            .bundle()
                            .on("error", (error) => {
                                return notify().write(error);
                            });
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/js/"))
        .pipe(browserSync.stream())
        .pipe(notify("JS Compilado"));
});

gulp.task("img", () => {
    gulp.src("src/img/*")
        .pipe(responsive({
            '*': [
                { width: 150, rename: { suffix: "-150px"}},
                { width: 250, rename: { suffix: "-250px"}},
                { width: 300, rename: { suffix: "-300px"}}
            ]
        }))
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img/"))
});

gulp.task("default", ["img", "html", "sass", "js"], () => {

	browserSync.init({ proxy: "http://127.0.0.1:3100/" });
	
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);
    gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
});