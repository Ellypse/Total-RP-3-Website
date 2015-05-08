var routes = function(app){

	app.use('/', require('./routes/index'));
	app.use("/wiki", require('./routes/wiki/wiki'));
	app.use("/localization", require('./routes/localization/localization'));
	app.use("/user", require('./routes/user/user'));

};

module.exports = routes;