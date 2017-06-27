module.exports = function (app) {
	app.use('/', require('../routes/index'));
	app.use('/wiki', require('../routes/wiki'));
	app.use('/documentation', require('../routes/documentation'));
};