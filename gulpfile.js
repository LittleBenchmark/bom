var gulp = require('gulp'),
		watch = require('gulp-watch'),
		shell = require('gulp-shell'),
		pug = require('gulp-pug'),
		path = require('path'),
		less = require('gulp-less'),
		plumber = require('gulp-plumber'),
		cssmin = require('gulp-cssmin'),
		ignore = require('gulp-ignore'),
		rename = require('gulp-rename'),
		cleanCSS = require('gulp-clean-css');

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};

gulp.task('views', function buildHTML() {
	return gulp.src('templates/views/*.pug')
	.pipe(pug({
		// Your options in here.
	}));
});

//Handles cleaning leftover css files
// gulp.task('clean-css', function () {
// 	return gulp.src('./public/styles/*.css')
// 		.pipe(cleanCSS({compatibility: 'ie8'}))
// 		.pipe(gulp.dest('./public/styles'));
// });

// Handles starting up KeystoneJS
gulp.task('runKeystone', shell.task('node keystone.js'));

// Watches for changed files
gulp.task('watch', function () {
	gulp.watch('./public/styles/*.less', ['less']);
});

// Runs LESS compiling routines on stylesheets
gulp.task('less', function () {
	gulp.src([
			'./public/styles/components/*.less',
			'./public/styles/site.less',
			'!./public/styles/bootstrap/**',
			'!./public/styles/themes/**',
			'!./public/styles/components/buttons.less'
		])
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('./public/styles/'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./public/styles/'));
});

// What should happen when you run `gulp` in cli
gulp.task('default', ['less', 'runKeystone', 'watch']);
