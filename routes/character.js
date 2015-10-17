var debug = require('debug')('character'),
	request = require('request-promise'),
	Q = require('q');
var express = require('express');
var router = express.Router();

debug('Importing isAuthenticated method from passport');

var isAuthenticated = require("../controllers/authentication-controller").isAuthenticated;

router.get('/', isAuthenticated, function (req, res) {
	debug("Character GET")
	var availableRegions = ['eu', 'us', 'kr', 'tw'];

	var charactersUri = ".api.battle.net/wow/user/characters?access_token=" + req.user.battlenet.accessToken;

	var the_promises = [];

	for (var i = 0; i < availableRegions.length; i++) {
		var region = availableRegions[i];
		var deferred = Q.defer();
		debug('Sending request to Blizzard’s API for region', region);
		debug('Using URL:', "https://" + region + charactersUri);
		(function(deferred){
			request("https://" + region + charactersUri)
					.then(function(data){
						deferred.resolve(JSON.parse(data).characters);
					}, deferred.reject);
			the_promises.push(deferred.promise);
		})(deferred);
		debug('Adding promise to the list of primises for region', region);

	}
	debug('Preparing callback for when all the promises are resolved');

	Q.all(the_promises).then(function (data) {
		debug('All the promises are resolved');
		var merged = [];
		debug('Merging data', data);
		merged = merged.concat.apply(merged, data);
		debug('Data merged', merged);
		debug('Outputing merged data');
		res.json({
			characters: merged
		});
	});
});

module.exports = router;
