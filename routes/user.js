var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	debug = require('debug')('routes:user');

var userService = require("../services/user-service");
var authenticationController = require("../controllers/authentication-controller");
var isAuthenticated = authenticationController.isAuthenticated;
var hasAdministratorRights = authenticationController.hasAdministratorRights;

router.get('/login', function (req, res) {
	return res.render("user/login");
});

router.get('/auth/bnet', passport.authenticate('bnet'));

router.get('/auth/bnet/callback', passport.authenticate('bnet', {
	failureRedirect: '/'
}), function (req, res) {
	debug('Battle.net authentication successfull', req.user);
	userService.findById(req.user.battlenet.id, function (err, user) {
		if (err) {
			debug('Error while fetching the database', err);
			return;
		}
		if (!user) {
			debug('No user found in the database for this ID, adding new user');
			userService.addUser(req.user, function (err) {
				if (err) console.log(err);
				debug('User successfully added to the database. Redirecting to the registration wizard.');
				res.redirect('/user/register');
			});
		}
		else {
			debug('User found in the database', user);
			if (req.session.destination) {
				debug('Previous destination for user found, redirection to that destination', req.session.destination);
				res.redirect(req.session.destination);
			}
			else {
				debug('No destination stored for the user, fallback to /documentation');
				res.redirect('/documentation');
			}
		}
	});
});

router.get('/register', isAuthenticated, function (req, res) {
	res.render("user/register", {
		battletag: req.user.battlenet.battletag,
		destination: req.session.destination || "/wiki"
	});
});

router.post('/register', isAuthenticated, function (req, res) {
	debug('Registration form data receuved', req.body);
	debug('Current user', req.user);
	debug('Updating user in the database');
	userService.update({
		'battlenet.id': req.user.battlenet.id
	}, {
		username: req.body.username,
		email: req.body.email
	}, function () {
		debug('User updated');
		return res.json({
			status: 'ok'
		});
	});
});

router.get('/manage', isAuthenticated, hasAdministratorRights, function (req, res) {
	res.render("user/manage", {
		user: req.user
	});
});

router.get('/getAll', isAuthenticated, hasAdministratorRights, function (req, res) {
	userService.findAll(function (err, users) {
		if (err) res.sendStatus(500);
		else res.json(users);
	});
});

router.post('/delete', isAuthenticated, hasAdministratorRights, function (req, res) {
	userService.delete(req.body.userId, function (err) {
		if (err) res.sendStatus(500);
		else res.sendStatus(200);
	})
});

router.post('/update', isAuthenticated, hasAdministratorRights, function (req, res){
	userService.update({
		'_id': req.body._id
	}, req.body, function (err) {
		if (err) res.sendStatus(500);
		else res.sendStatus(200);
	});
});

module.exports = router;
