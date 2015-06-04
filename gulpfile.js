// NOTE: I previously suggested doing this through Grunt, but had plenty of problems with
// my set up. Grunt did some weird things with scope, and I ended up using nodemon. This
// setup is now using Gulp. It works exactly how I expect it to and is WAY more concise.
var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	spawn = require('child_process').spawn,
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer-core'),
	debug = require('gulp-debug'),
	clean = require('gulp-clean'),
	node;


/**
 * $ gulp
 * Description: Launch node server.
 * Copy dependencies to public lib folder
 * Watch for changes in JavaScript files to reload server.
 * Watch for changes in the .less files to compile them to css
 */
gulp.task('default', function () {
	gulp.run('clean');
	gulp.run('bower');
	gulp.run('server');

	gulp.watch(['./*.js','./routes/**/*.js',['./views/**/*.html']], function () {
		gulp.run('server');
	});

	gulp.watch('./less/*.less', function () {
		gulp.run('css');
	});
});

/**
 * $ gulp css
 * Description : Compile .less stylesheets into CSS stylesheets and prefix what's necessary.
 */
gulp.task('css', function () {
	var processors = [
		autoprefixer({browsers: ['last 3 versions']})
	];
	gulp.src('./styles/**/*.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(debug({title: 'Less files :'}))
		.pipe(postcss(processors))
		.pipe(gulp.dest('./public/stylesheets'));
});

/**
 * $ gulp bower
 * Description : Copy distribution minified version of bower dependencies to public lib folder
 */
gulp.task('bower', function() {
	gulp.src(['./bower_components/**/*.js',
		'./bower_components/**/*.css',
		'./bower_components/**/*.map'])
		.pipe(debug({title: 'Bower:'}))
		.pipe(gulp.dest('public/libs/'))
});

/**
 * $ gulp build
 * Description : Do everything needed to make sure we can deploy on the server
 */
gulp.task('build', function() {
	gulp.run("bower");
	gulp.run("css");
});

/**
 * $ gulp server
 * Description: Launch node server. If there's a server already running, kill it.
 */
gulp.task('server', function () {
	if (node) node.kill();
	node = spawn('node', ['./server.js'], {stdio: 'inherit'});
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});

/**
 * $ gulp clean
 * Empty folders which content is generated
 */
gulp.task('clean', function(){
	var filesAndDirectories = [
		// Files and directories to purge
		'./public/stylesheets/*',
		'./public/libs/*',
		// Files and directories to preserve
		'!./public/libs/raneto',
		'!./public/libs/livefyre'];
	gulp.src(filesAndDirectories)
		.pipe(clean({force: true}))
		.pipe(debug({title:'Clean'}));
});

// clean up if an error goes unhandled.
process.on('exit', function () {
	if (node) node.kill()
});