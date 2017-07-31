'use strict';

const gulp = require('gulp'),
	clean = require('gulp-clean'),
	less = require('gulp-less'),
	pug = require('gulp-pug'),
	browser = require('gulp-browser'),
	uglify = require('gulp-uglify'),
    server = require("gulp-webserver");
    
const LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	LessPluginCleanCSS = require('less-plugin-clean-css');

const cleanCss = new LessPluginCleanCSS({advanced: true}),
    autoPreFix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});
    
gulp.task('clean', () => {
	return gulp.src(['docs/**/*.html','docs/**/*.css','docs/**/*.js'])
		.pipe(clean());
});

gulp.task('css', () => {
	return gulp.src('src/styles/*.less')
		.pipe(less({plugins: [autoPreFix, cleanCss]}))
		.pipe(gulp.dest('docs/css'));;
});

gulp.task('html', () => {
	return gulp.src('src/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('docs'));
});

gulp.task('browserify', () => {
	return gulp.src('src/app/main.js')
		.pipe(browser.browserify())
		// .pipe(uglify())
		.pipe(gulp.dest('docs/js'))
});

gulp.task('default', ['css', 'browserify','html'], () => {});

gulp.task('server',['default'],function(){
	gulp.src('docs')
		.pipe(server({
			host: "0.0.0.0",
			liveReload: true,
			directoryListing: false,
			open: true
		}));
	gulp.watch(['src/**/*'], ['default']);
});