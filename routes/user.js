/**
 * Node modules importation
 */
var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	debug = require('debug')('app');

/**
 * Controllers
 */
var User = appReq('/services/user-service'),
	isAuthenticated = appReq("/controllers/authentication/passport-auth").isAuthenticated;

/**
 * GET /user/
 * TODO User homepage (list availalbe features)
 */
router.get('/', isAuthenticated, function(req, res){

});

/**
 * GET /user/register
 * Setup wizard for the username and email
 */
router.get('/register', isAuthenticated, function(req, res){
	// If a destination was registered inside the session, use it for redirecting after the registration (/wikid default)
	var destination = req.session.destination ? req.session.destination : "/wiki";
	res.render("user/register", {
		battletag: req.user.battlenet.battletag,
		destination: destination
	});
});

/**
 * POST /user/register
 * @param username String
 * @param email String
 * Set the username and email address of the user in the database
 */
router.post('/register', isAuthenticated, function(req, res){
	User.update({'battlenet.id': req.user.battlenet.id}, {
		username: req.body.username,
		email: req.body.email
	}, function(){
		res.json({status: 'ok'});
	});
});

/**
 * Get /user/login
 * Display the login page with a login button to use Battle.net authentication
 */
router.get('/login', function(req, res){
	res.render("user/login");
});

/**
 * GET /user/auth/bnet
 * Initialize the Battle.net authentication (handled by Battle.net's passport strategy)
 */
router.get('/auth/bnet',
	passport.authenticate('bnet'));

/**
 * GET /user/auth/bnet/callback
 * Battle.net authentication callback
 * Called by Battle.net after the authentication
 */
router.get('/auth/bnet/callback',
	passport.authenticate('bnet', {failureRedirect: '/'}),
	function(req, res){
		// Looking for a user with the id provided by Battle.net
		User.findById(req.user.battlenet.id, function(err, user){
			if(err){
				return console.warn(err);
			}
			// If no user exists with the given ID, create the user the user in the database
			if(!user){
				User.addUser(req.user, function(){
					// Go to the register page to setup the username and email
					res.redirect('/user/register');
				})
			}

			// If a destination was previously set in the session...
			if(req.session.destination){
				// ... redirect the user to that destination
				res.redirect(req.session.destination);
			}
			else{
				// If no destination was set, redirect to the wiki
				res.redirect('/wiki');
			}

		});
	});

module.exports = router;
