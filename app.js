var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	extend = require('extend'),
	raneto = require('./raneto-custom'),
	favicon = require('serve-favicon'),
	lessMiddleware = require('less-middleware'),
	autoprefixer = require('autoprefixer-core');
	session = require('express-session');

var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = process.env.DEBUG ? "73sqymavgu3jsqn8vf5d5gfh98tpx3ac" : "3c98a589tk4rh64xne4c5wytw3pd5w63";
var BNET_SECRET = process.env.DEBUG ? "5c4vdRDpDfCaaFUPb7RusGX6p3p6KS6M" : "p9mRFMnZBMFuRQUsxrfk3Av7kTJsZQHT";
var BNET_CALLBACK = process.env.DEBUG ? "https://localhost:3000/user/auth/bnet/callback" : "https://totalrp3.info/user/auth/bnet/callback";

var config = require('./config'),
	error_handlers = require('./error_handlers'),
	routes = require('./routes');


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
app.use(session({ secret: 'prlatot' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(lessMiddleware(path.join(__dirname, 'less'), {
	dest: path.join(__dirname, 'public'),
	preprocess: {
		path: function(pathname, req){
			return pathname.replace(path.sep + 'stylesheets' + path.sep, path.sep);
		}
	},
	postprocess : {
		css: function(css, req){
			return autoprefixer.process(css).css;
		}
	}
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

passport.use(new BnetStrategy({
	clientID: BNET_ID,
	clientSecret: BNET_SECRET,
	callbackURL: BNET_CALLBACK
}, function(accessToken, refreshToken, profile, done) {
	console.log("This is my access token : ", accessToken);
	console.log("This is my profile : ", profile);
	return done(null, profile);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

extend(raneto.config, config.wiki);

routes(app);

error_handlers(app);

module.exports = app;
