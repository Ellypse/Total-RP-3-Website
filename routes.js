var routes = function(app){

	app.use('/', require('./routes/index'));

	app.use("/wiki", require('./routes/wiki/wiki'));

};

module.exports = routes;