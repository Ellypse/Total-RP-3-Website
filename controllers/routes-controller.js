module.exports = function (app) {
	app.use('/', require('../routes/index'));
	app.use('/character', require('../routes/character'));
	app.use('/wiki', require('../routes/wiki'));
	app.use('/user', require('../routes/user'));
	app.use('/documentation', require('../routes/documentation'));
};