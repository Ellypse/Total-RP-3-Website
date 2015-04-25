// NOTE: I previously suggested doing this through Grunt, but had plenty of problems with
// my set up. Grunt did some weird things with scope, and I ended up using nodemon. This
// setup is now using Gulp. It works exactly how I expect it to and is WAY more concise.
var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	spawn = require('child_process').spawn,
	autoprefixer = require('gulp-autoprefixer'),
	node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function () {
	if (node) node.kill()
	node = spawn('node', ['./bin/www'], {stdio: 'inherit'})
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
})

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function () {
	gulp.run('server')

	gulp.watch(['*', './views/**/*.jade', './routes/**/*.js', './less/*.less'], function () {
		gulp.run('server');
	});


	gulp.watch('./less/*.less', function () {
		console.log("Compiling less.");
		gulp.run('less');
	});
})

gulp.task('less', function () {
	gulp.src('./less/**/*.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(autoprefixer({
			browsers: ['ie 8'],
			cascade: false
		}))
		.pipe(gulp.dest('./public/stylesheets'));
});

// clean up if an error goes unhandled.
process.on('exit', function () {
	if (node) node.kill()
});