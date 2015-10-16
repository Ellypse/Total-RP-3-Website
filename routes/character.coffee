# Node modules importation
debug = require('debug')('character')
router = require 'express'
	.Router()
request = require 'request-promise'
Q = require 'q'

# Controllers
debug 'Importing isAuthenticated method from passport'
isAuthenticated = appReq "/controllers/authentication/passport-auth"
    .isAuthenticated

# GET / Returns the list of characters for thecurrent user using the Battle.net API
router.get '/ ', isAuthenticated, (req, res) ->
	debug 'GET /character/'
	# List of available regions
	availableRegions = ['eu','us','kr','tw']

	debug 'Current user Battle.net token', req.user.battlenet.accessToken
	# API url for getting the characters list
	charactersUri = ".api.battle.net/wow/user/characters?access_token=#{req.user.battlenet.accessToken}"
	debug 'API URL:', charactersUri

	# The array of promises allows us to execute asynchronous request and wait for all of them to resolve to deal with the result
	the_promises = [];

	debug 'Looping through regions'
	# We will request Blizzard’s API for each available region, so we have all the characters for that account
	for region in availableRegions
		# Create a new promise
		deferred = Q.defer()
		debug 'Sending request to Blizzard’s API for region', region
		debug 'Using URL:', "https://#{region}#{charactersUri}"
		# Request the API
		request "https://#{region}#{charactersUri}"
			.then \
				(data) ->
					debug 'Received response from Blizzard’s API for region', region, data

					debug 'Parsing data and fetching characters for region', region
					characters = JSON.parse data
						.characters
					debug 'Characters found for region', region, characters

					debug 'Resolving promise for region', region
					# Resolve the promise once we get the result of the request
					deferred.resolve
				,
				(error) ->
					debug 'Error response received from Blizzard’s API for region', region, error

					debug 'Rejecting promise for region', region
					deferred.reject error
					# If an error occured, we reject the promise

		debug 'Adding promise to the list of primises for region', region
		# Add the promise to the array of promises
		the_promises.push deferred.promise

	debug 'Preparing callback for when all the promises are resolved'
	# Once all promises are resolved
	Q.all the_promises
		.then (data) ->
			debug 'All the promises are resolved'
			merged = []

			debug 'Merging data', data
			#Merge each array returned by the promises into a single one array of characters data
			merged = merged.concat.apply merged, data
			debug 'Data merged', merged

			debug 'Outputing merged data'
			res.json
				characters: merged

module.exports = router
