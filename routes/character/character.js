/**
 * Node modules importation
 */
var express = require('express'),
	router = express.Router(),
	authenticated = require("../../auth/passport-auth").isAuthenticated,
	request = require('request');

/**
 * Controllers
 */
router.get('/', authenticated, function(req,res){
	var charactersUri = "https://eu.api.battle.net/wow/user/characters?access_token="+req.user.battlenet.accessToken;
	request(charactersUri, function (error, response, body) {
		res.json(JSON.parse(body)).end();
	});
});

module.exports = router;
