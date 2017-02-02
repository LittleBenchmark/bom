var gulp = require('gulp'),
		watch = require('gulp-watch'),
		shell = require('gulp-shell'),
		pug = require('gulp-pug'),
		path = require('path'),
		less = require('gulp-less'),
		plumber = require('gulp-plumber'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename');

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};

gulp.task('views', function buildHTML() {
	return gulp.src('templates/views/*.pug')
	.pipe(pug({
		// Your options in here.
	}));
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', function () {
	gulp.watch('./public/styles/*.less', ['less']);
});

gulp.task('less', function () {
	gulp.src('./public/styles/*.less', '!./public/styles/bootstrap/**', '!./public/styles/site.less', '!./public/styles/themes/**')
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('./public/styles/'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./public/styles/'));
});


gulp.task('default', ['less', 'watch', 'runKeystone']);
