'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	runsequence = require('gulp-run-sequence'),
	gutil = require('gulp-util');
 


gulp.task('test', function() {
	return runsequence(['testserver', 'testclient']);
});


gulp.task('testclient', function (done) {
	var Server = require('karma').Server;

	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: false
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
	//var minifier = require('gulp-minify-html');

	return gulp.src('public/app/**/*.htm')
	//.pipe(minifier())
	.pipe(templateCache({ 
		module : 'app'
	}))
	.pipe(gulp.dest('public/build'));
});


gulp.task('js', function() {

	var browserify = require('browserify');
	var source = require('vinyl-source-stream');
	var buffer = require('vinyl-buffer');

	var b = browserify({
		entries: [
			'./public/app/app.module.js',
			'./public/build/templates.js'
		],
		debug: true
	});

	return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/build/'));
    
    // .pipe(uglify())
    // .on('error', gutil.log)
    // .pipe(rename('app.min.js'))
    // .pipe(gulp.dest('./public/build/'));

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

function swallowError(err) {
	console.log(err.toString());
	 this.emit('end');
}



gulp.task('watch', function() {
	gulp.watch('./public/assets/sass/**/*.scss', ['sass']).on('error', swallowError);
	gulp.watch('./public/app/**/*.htm', ['ngtemplates', ['js']]).on('error', swallowError);
	gulp.watch('./public/app/**/*.js', ['jshint', 'js']).on('error', swallowError);
});


gulp.task('gzip', function() {

	var gzip = require('gulp-gzip');

	gulp.src([
		'./public/build/app.js',
		'./public/build/style.min.css',
	])
	.pipe(gzip())
    .pipe(gulp.dest('./public/build'));

});


gulp.task('build', function() {
	runsequence('test', 'clean', ['sass', 'ngtemplates'], 'buildjs', 'gzip');
});
