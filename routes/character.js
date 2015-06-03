/**
 * Node modules importation
 */
var express = require('express'),
	router = express.Router(),
	request = require('request-promise'),
	Q = require('q');

/**
 * Controllers
 */
var isAuthenticated = appReq("/controllers/authentication/passport-auth").isAuthenticated;

/**
 * GET / Returns the list of characters for the current user using the Battle.net API
 */
router.get('/', isAuthenticated, function(req, res){
	// List of available regions
	var availableRegions = ['eu', 'us', 'kr', 'tw'];
	// API url for getting the characters list
	var charactersUri = ".api.battle.net/wow/user/characters?access_token=" + req.user.battlenet.accessToken;
	var characters = [];
	// The array of promises allows us to execute asynchronous request and wait for all of them to resolve to deal with the result
	var the_promises = [];

	availableRegions.forEach(function(region){
		// Create a new promise
		var deferred = Q.defer();
		// Request the API
		request("https://" + region + charactersUri).then(function(data){
			// Resolve the promise once we get the result of the request
			deferred.resolve(JSON.parse(data).characters);
		});
		// Add the promise to the array of promises
		the_promises.push(deferred.promise);
	});
	// Once all promises are resolved
	Q.all(the_promises).then(function(data){
		var merged = [];
		// Merge each array returned by the promises into a single one array of characters data
		merged = merged.concat.apply(merged, data);
		res.json({characters: merged});
	});
});

module.exports = router;
