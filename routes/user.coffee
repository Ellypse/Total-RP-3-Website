# Node modules importation
debug = require('debug')('user')
router = require 'express'
	.Router()
passport = require 'passport'

# Controllers
debug 'Importing User service'
User = appReq '/services/user-service'
debug 'Importing isAuthenticated method from passport'
isAuthenticated = appReq "/controllers/authentication/passport-auth"
	.isAuthenticated

# GET /user/
# TODO User homepage (list availalbe features)
router.get '/ ', isAuthenticated, (req, res) ->
	debug 'GET /user/'

# GET /user/register
# Setup wizard for the username and email
router.get '/register', isAuthenticated, (req, res) ->
	debug 'GET /user/register'
	debug 'Current user', req.user
	# If a destination was registered inside the session, use it for redirecting after the registration (/wiki default)
	destination = req.session.destination or "/wiki"
	debug 'User destination', destination
	debug 'Rendering user/register view'
	res.render "user/register",
		battletag: req.user.battlenet.battletag,
		destination: destination

# POST /user/register
# @param username String
# @param email String
# Set the username and email address of the user in the database
router.post '/register', isAuthenticated, (req, res) ->
	debug 'POST /user/register'
	debug 'Form data', req.body
	debug 'Current user', req.user
	debug 'Updating user in the database'
	User.update	{'battlenet.id': req.user.battlenet.id}, {username: req.body.username, email: req.body.email}, ->
		debug 'User updated'
		res.json
			status: 'ok'

# Get /user/login
# Display the login page with a login button to use Battle.net authentication
router.get '/login', (req, res) ->
	debug 'GET /user/login'
	debug 'Rendering user/login view'
	res.render "user/login"

# GET /user/auth/bnet
# Initialize the Battle.net authentication (handled by Battle.net 's passport strategy)
router.get '/auth/bnet', passport.authenticate 'bnet'

# GET /user/auth/bnet/callback
# Battle.net authentication callback
# Called by Battle.net after the authentication
router.get '/auth/bnet/callback', passport.authenticate('bnet', {failureRedirect: '/'}), (req, res) ->
	debug 'GET /user/auth/bnet/callback'
	debug '<called by Blizzard>'

	debug 'User data', req.user

	debug 'Looking for an existing user in the database for ID', req.user.battlenet.id
	# Looking for a user with the id provided by Battle.net
	User.findById req.user.battlenet.id, (err, user) ->
		if err
			debug 'Error while fetching the database', err
			return
		# If no user exists with the given ID, create the user the user in the database
		if !user
			debug 'No user found for ID', req.user.battlenet.id

			debug 'Inserting a new user in the database for received data', data
			User.addUser req.user, ->
				debug 'User correctly inserted in the database'

				debug 'Redirecting user to the registration page'
				# Go to the register page to setup the username and email
				res.redirect '/user/register'

		debug 'User found', user

		# If a destination was previously set in the session...
		if req.session.destination
			debug 'User has a destination set', req.session.destination

			debug 'Redirecting user to the destination', req.session.destination
			# ... redirect the user to that destination
			res.redirect req.session.destination
		else
			debug 'User does not have a destination'

			debug 'Redirecting user to the wiki (/wiki)'
			# If no destination was set, redirect to the wiki
			res.redirect '/wiki'


module.exports = router;
