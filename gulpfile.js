var	gulp = require("gulp"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	header = require("gulp-header"),
	rename = require('gulp-rename'),
	moment = require("moment"),
	path = require("path"),
	banner = '/*! <%= moment().format("YYYY-MM-DD HH:mm:ss") %> */\r\n';

var addHeader = function() {
  return header(banner, {
    moment: moment
  });
};


gulp.task("line", function() {
	return gulp.src(["src/util.js", "src/line.js"])
		.pipe(concat("line.js"))
		.pipe(uglify({mangle: true}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest("dist/"));
});

gulp.task("radar", function() {
	return gulp.src(["src/util.js", "src/radar.js"])
		.pipe(concat("radar.js"))
		.pipe(uglify({mangle: true}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest("dist/"));
});

gulp.task("chart", function() {
	return gulp.src([
			"src/util.js",
			"src/line.js",
			"src/radar.js"
		])
		.pipe(concat("chart.js"))
		.pipe(uglify({mangle: true}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(addHeader())
		.pipe(gulp.dest("dist/"));
});

gulp.task("default", ["line", "radar", "chart"]);
