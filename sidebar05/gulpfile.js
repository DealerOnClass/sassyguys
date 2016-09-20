var gulp        = require("gulp");
var sass        = require("gulp-sass");
var browserSync = require("browser-sync");

var root = {
	src: "./app/src/",
	dist: "./app/dist/"
}
var paths = {
	html: {
		src: root.src + "/**/*.html",
		dist: root.dist
	},
	scripts: {
		src: root.src + "/js/**/*.js",
		dist: root.dist + "js/"
	},
	styles: {
		src: root.src + "/sass/**/*.scss",
		dist: root.dist + "css/"
	}
}

gulp.task(html);
gulp.task(scripts);
gulp.task(styles);
gulp.task(serve);
gulp.task(watch);
gulp.task("default",
	gulp.series(
		html,
		scripts,
		styles,
		gulp.parallel(serve, watch)
	)
);

function html() {
	return gulp.src(paths.html.src)
	.pipe(gulp.dest(paths.html.dist))
	.pipe(browserSync.stream())
}

function scripts() {
	return gulp.src(paths.scripts.src)
	.pipe(gulp.dest(paths.scripts.dist))
	.pipe(browserSync.stream())
}
function styles() {
	return gulp.src(paths.styles.src)
	.pipe(sass().on("error", sass.logError))
	.pipe(gulp.dest(paths.styles.dist))
	.pipe(browserSync.stream())
}

function serve() {
	browserSync.init({
		server: root.dist
	})
}

function watch() {
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.styles.src, styles);
}
