# Node modules importation
debug = require('debug')('index')
router = require 'express'
	.Router()
# Controllers
debug 'Importing UI tweaks backgrounds controller'
backgrounds = appReq "/controllers/ui-tweaks/backgrounds"

# GET home page
router.get '/', (req, res) ->
	debug 'GET /'

	debug 'Picking a random background'
	background = backgrounds.pickOne (req.query.bg ? "")
	debug 'Picked background:', background

	debug 'Rendering index view'
	res.render "index",
		background: background.slice(0, -4)

module.exports = router;
