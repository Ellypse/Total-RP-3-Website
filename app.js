var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	extend = require('extend'),
	favicon = require('serve-favicon'),
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

app.use(favicon(path.join(__dirname, 'public/favicon.png')));
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
app.use(multer({dest: './uploads'}));
app.use(express.static(path.join(__dirname, 'public')));

extend(raneto.config, config.wiki);

routes(app);

error_handlers(app);

module.exports = app;
