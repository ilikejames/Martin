'use strict';


var gulp = require('gulp');

var concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	runsequence = require('gulp-run-sequence');
 

gulp.task('test', function() {
	return runsequence('testserver', 'testclient');
});

gulp.task('testclient', function (done) {
	var Server = require('karma').Server;

	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('testserver', function (done) {
	var jasmine = require('gulp-jasmine');
	return gulp.src('server/**/*.test.js')
     .pipe(jasmine());
});


gulp.task('clean', function() {
	var del = require('del');
	return del('public/build');
});


gulp.task('ngtemplates', function () {

	var templateCache = require('gulp-angular-templatecache');

	return gulp.src('public/app/**/*.htm')
	.pipe(templateCache({ 
		module : 'app'
	}))
	.pipe(gulp.dest('public/build'));
});


var vendorScripts = [
	'./public/assets/vendor/angular-route/angular-route.min.js',
	'./public/assets/vendor/fastclick/lib/fastclick.min.js',
	'./public/assets/vendor/lodash/lodash.min.js'
];


gulp.task('buildjs', function() {

	return gulp.src(vendorScripts.concat([
		'./public/app/**/*.js',
		'!./public/app/**/*.test.js',
		'./public/build/templates.js'
	]))
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write())
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./public/build'))
    .pipe(uglify({
        compress: {
            negate_iife: false
        }
    }))
	.pipe(rename('build.min.js'))
	.pipe(gulp.dest('./public/build'));
});


gulp.task('jshint', function() {

	var jshint = require('gulp-jshint');

	return gulp.src([
		'./public/app/**/*.js',
		'./public/build/templates.js'
	])
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});


gulp.task('sass', function () {

	var sass = require('gulp-sass'),
		minifyCss = require('gulp-minify-css');

	gulp.src('./public/assets/sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./public/build'))
	.pipe(minifyCss())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('./public/build'));
});



gulp.task('watch', function() {
	gulp.watch('./public/assets/sass/**/*.scss', ['sass']);
	gulp.watch('./public/app/**/*.htm', ['ngtemplates']);
	gulp.watch('./public/app/**/*.js', ['jshint', 'buildjs']);
});


gulp.task('gzip', function() {

	var gzip = require('gulp-gzip');

	gulp.src([
		'./public/build/build.min.js',
		'./public/build/style.min.css',
	])
	.pipe(gzip())
    .pipe(gulp.dest('./public/build'));

});

gulp.task('build', function() {
	runsequence('test', 'clean', ['sass', 'ngtemplates'], 'buildjs', 'gzip');
});
