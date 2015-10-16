error_handlers = (app) ->

	debug = require('debug')('routes')

	# 404 and forward to error handler
	app.use (req, res, next) ->
		err = new Error 'Not Found'
		err.status = 404;
		debug err
		next err

	# development error handler
	app.use (err, req, res, next) ->
		debug(err);
		res.status(err.status || 500);
		res.render 'error',
			message: err.message,
			error: if app.get 'env' is 'development' then err else {}

module.exports = error_handlers