'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function () {
	return gulp.src("./public/stylesheets/*.scss")
		.pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions", "IE 10", "> 5%"],
			cascade: false
		}))
		.pipe(gulp.dest("./public/stylesheets/"));
});

gulp.task("sass:watch", ["sass"], function () {
	gulp.watch("./public/stylesheets/*.scss", ["sass"]);
});

gulp.task('bower', function () {
	return bower()
		.pipe(gulp.dest('./public/libs/'));
});