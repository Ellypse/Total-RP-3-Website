var appRoot = require('app-root-path');

var routes = function(app){

	app.use('/', require(appRoot + '/routes/index'))
		.use("/wiki", require(appRoot + '/routes/wiki'))
		.use("/user", require(appRoot + '/routes/user'))
		.use('/character', require(appRoot + '/routes/character'))
		.use('/localization', require(appRoot + '/routes/localization'));

};

module.exports = routes;