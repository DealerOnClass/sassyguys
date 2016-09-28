var gulp = require("gulp");
var cp	 = require("child_process");
var sass = require("gulp-sass");
var sync = require("browser-sync");

gulp.task("default",
	gulp.series(
		jekyll,
		css,
		js,
		gulp.parallel(serve, watch)
	)
)

function jekyll(done) {
	return cp.spawn("jekyll.bat", ["build"], {stdio: "inherit"}).on("close", done)
}

function css() {
	return gulp.src("./app/assets/_src/sass/**/*.scss")
	.pipe(sass().on("error",sass.logError))
	.pipe(gulp.dest("./app/assets/css/"))
	.pipe(gulp.dest("./_site/assets/css/"))
	.pipe(sync.stream())
}

function js() {
	return gulp.src("./app/assets/_src/js/**/*.js")
	.pipe(gulp.dest("./app/assets/js/"))
	.pipe(gulp.dest("./_site/assets/js/"))
	.pipe(sync.stream())
}

function reload() {
	sync.reload();
}

function serve() {
	sync.init({
		server: "./_site/"
	})
}

function watch() {
	gulp.watch("./app/**/*.html").on("change", gulp.series(jekyll, reload));
	gulp.watch("./app/**/*.md").on("change", gulp.series(jekyll, reload));
	gulp.watch("./app/assets/_src/sass/**/*.scss").on("change", css);
	gulp.watch("./app/assets/_src/js/**/*.js").on("change", js);
}
