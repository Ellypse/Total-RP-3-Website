var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	extend = require('extend'),
	raneto = require('raneto-core'),
	favicon = require('serve-favicon');

var config = require('./config'),
	error_handlers = require('./error_handlers'),
	routes = require('./routes');


app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

extend(raneto.config, config);

routes(app);

error_handlers(app);

module.exports = app;
