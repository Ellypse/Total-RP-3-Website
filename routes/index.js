/**
 * Node modules importation
 */
var express = require('express'),
	router = express.Router(),
	fs = require('fs');

/**
 * Controllers
 */
var backgrounds = appReq("/controllers/ui-tweaks/backgrounds");

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render("index", {background : backgrounds.pickOne()});
});

module.exports = router;
