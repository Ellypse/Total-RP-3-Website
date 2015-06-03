var appRoot = require('app-root-path');

var routes = function(app){

	app.use('/', appReq('/routes/index'))
		.use("/wiki", appReq('/routes/wiki'))
		.use("/user", appReq('/routes/user'))
		.use('/character', appReq('/routes/character'))
		.use('/localization', appReq('/routes/localization'));

};

module.exports = routes;