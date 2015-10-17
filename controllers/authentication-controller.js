var debug = require('debug')('passport');
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;

debug('Importing Battle.net configuration');
var bnetConfig = require('../config/battlenet-authentication');
debug('Imported Battle.net configuration', bnetConfig);

debug('Importing user service');
var UserService = require('../services/user-service');
debug('User service imported');

debug('Setting Battle.net as strategy for passport');
passport.use(new BnetStrategy(bnetConfig, function (accessToken, refreshToken, profile, done) {
	debug('Battle.net authentication');
	debug('accessToken', accessToken);
	debug('refreshToken', refreshToken);
	debug('profile', profile);
	done(null, {
		accessToken: accessToken,
		battlenet: profile
	});
}));

passport.serializeUser(function (user, done) {
	debug('Serializing user', user);
	done(null, user.battlenet.id);
});

passport.deserializeUser(function (userId, done) {
	debug('Deserializing user from user ID', userId);

	debug('Fetching database for user with ID', userId);
	UserService.findById(userId, function (err, user) {
		debug('User found', user);
		done(null, user);
	});
});

passport.isAuthenticated = function (req, res, next) {
	debug('Checking if current user is authenticated');
	if (req.user) {
		debug('User is authenticated');
		return next();
	}

	debug('User is not authenticated');
	debug('Storing request URL in session for later', req.originalUrl);
	req.session.destination = req.originalUrl;
	debug('Redirecting user to the login page');
	res.redirect('/user/login').end();
};

passport.hasAdministratorRights = function (req, res, next) {
	//  && process.env['DEBUG'] === null
	if ((!req.user || !req.user.isAdmin)) {
		res.sendStatus(401);
	}
	else{
		next()
	}
};

module.exports = passport;
