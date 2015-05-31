/**
 * Node modules importation
 */
var appRoot = require('app-root-path'),
	express = require('express'),
	router = express.Router(),
	request = require('request-promise')
Q = require('q');

/**
 * Controllers
 */
var isAuthenticated = require(appRoot + "/controllers/authentication/passport-auth").isAuthenticated;

function getCharacters(region, charactersUri){
	return request("https://" + region + charactersUri);
}

router.get('/', isAuthenticated, function(req, res){
	var availableRegions = ['eu', 'us', 'kr', 'tw'];
	var charactersUri = ".api.battle.net/wow/user/characters?access_token=" + req.user.battlenet.accessToken;
	var characters = [];
	var the_promises = [];
	availableRegions.forEach(function(region){
		var deferred = Q.defer();
		getCharacters(region, charactersUri).then(function(data){
			deferred.resolve(JSON.parse(data).characters);
		});
		the_promises.push(deferred.promise);
	});
	Q.all(the_promises).then(
		function(data){
			var merged = [];
			merged = merged.concat.apply(merged, data);
			res.json({characters: merged});
		}
	);
});

module.exports = router;
