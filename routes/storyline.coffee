router = require 'express'
	.Router()

# GET home page
router.get '/', (req, res) ->
	res.render "storyline/storyline"


module.exports = router;
