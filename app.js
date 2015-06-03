var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	extend = require('extend'),
	favicon = require('serve-favicon'),
	lessMiddleware = require('less-middleware'),
	autoprefixer = require('autoprefixer-core'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	multer = require('multer');

// appReq() will require using the app path
global.appReq = require('app-root-path').require;

var config = appReq('/config'),
	error_handlers = appReq('/controllers/error_handlers'),
	routes = appReq('/routes'),
	mongoose = appReq('/database'),
	raneto = appReq('/controllers/raneto-custom'),
	passport = appReq('/controllers/authentication/passport-auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
		secret: 'prlatot',
		name: 'totalrp3_session',
		store: new MongoStore({mongooseConnection: mongoose.connection}),
		resave: false,
		saveUninitialized: false
	}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(lessMiddleware(path.join(__dirname, 'styles'), {
	dest: path.join(__dirname, 'public'),
	preprocess: {
		path: function(pathname, req){
			return pathname.replace(path.sep + 'stylesheets' + path.sep, path.sep);
		}
	},
	postprocess: {
		css: function(css, req){
			return autoprefixer.process(css).css;
		}
	}
}));
app.use(multer({dest: './uploads'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

extend(raneto.config, config.wiki);

routes(app);

error_handlers(app);

module.exports = app;
