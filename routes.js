var routes = function(app){

	app.use('/', require('./routes/index'));
	app.use("/wiki", require('./routes/wiki/wiki'));
	app.use("/user", require('./routes/user/user'));
	app.use('/character', require('./routes/character/character'));

};

module.exports = routes;