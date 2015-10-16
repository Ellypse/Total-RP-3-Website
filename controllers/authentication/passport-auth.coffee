# Node modules
debug = require('debug')('authentication')
passport = require 'passport'
BnetStrategy = require 'passport-bnet'
	.Strategy

# Config
debug 'Importing Battle.net configuration'
bnetConfig = appReq '/controllers/authentication/battlenet-config'
debug 'Battle.net configuration', bnetConfig

# Services
debug 'Importing user service'
User = appReq '/services/user-service'

# Battle.net passport strategy
passport.use new BnetStrategy bnetConfig, (accessToken, refreshToken, profile, done) ->
	debug 'Battle.net authentication'
	debug 'accessToken', accessToken
	debug 'refreshToken', refreshToken
	debug 'profile', profile
	return done null,
		accessToken: accessToken
		battlenet: profile

# Define how to identify the user for later -> save his Battle.net ID
passport.serializeUser (user, done) ->
	debug 'Serializing user', user
	done null, user.battlenet.id

# Find the user corresponding to the user id and return the User object
passport.deserializeUser (userId, done) ->
	debug 'Deserializing user from user ID', userId

	debug 'Fetching database for user with ID', userId
	User.findById userId, (err, user) ->
		debug 'User found', user
		done null, user


passport.isAuthenticated = (req, res, next) ->
	debug 'Checking if current user is authenticated'
	if req.user then debug 'User is authenticated'
	# Continue if the user is defined
	return next() if req.user

	debug 'User is not authenticated'

	debug 'Storing request URL in session for later', req.originalUrl
	# Save the current url so we can redirect the user to that page after authentication
	req.session.destination = req.originalUrl
	debug 'Redirecting user to the login page'
	# Go to the login page
	res.redirect '/user/login'

module.exports = passport;