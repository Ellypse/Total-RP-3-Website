appRoot = require 'app-root-path'

routes = (app) ->
	app.use '/', appReq '/routes/index'
		.use "/wiki", appReq '/routes/wiki'
		.use "/user", appReq '/routes/user'
		.use '/character', appReq '/routes/character'
		.use "/storyline", appReq '/routes/storyline'

module.exports = routes;