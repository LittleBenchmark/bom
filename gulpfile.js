var gulp = require('gulp'),
		watch = require('gulp-watch'),
		shell = require('gulp-shell'),
		pug = require('gulp-pug'),
		path = require('path'),
		less = require('gulp-less'),
		plumber = require('gulp-plumber'),
		cssmin = require('gulp-cssmin'),
		ignore = require('gulp-ignore'),
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

	var bootstrap_dir = '';
	gulp.src([
			'!public/styles/bootstrap/**',
			'!public/styles/themes/**',
			'!public/styles/site.less',
			'!public/styles/components/buttons.less',
			'!public/styles/site/entypo.less',
			'!public/styles/site/mixins.less',
			'!public/styles/site/layout.less',
			'!public/styles/site/session.less',
			'!public/styles/site/variables.less',
			'public/styles/components/*.less',
			'public/styles/site/*.less'
		])
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('./public/styles/'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest('./public/styles/'));
});


gulp.task('default', ['less', 'runKeystone', 'watch']);
