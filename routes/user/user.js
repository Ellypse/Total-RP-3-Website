/**
 * Node modules importation
 */
var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	bcrypt = require('bcrypt');

/**
 * Controllers
 */
var Users = require('../../model/users');

/* GET home page. */
router.get('/register', function (req, res, next) {
	res.render("user/register");
});

router.post('/register', function(req, res, next){
	console.log(req.body);

	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.password, salt);
	var newUser = new Users({
		username : req.body.username,
		password : hash,
		email : req.body.email
	});
	newUser.save();
});

router.get('/login', function(req, res, next){
	res.render("user/login");
});

router.post('/login', function(req, res, next){
	console.log(req.body);
	Users.findOne({ username: req.body.username}, function(error, data){
		console.log(data);
		bcrypt.compare(req.body.password, data.password, function(err, result) {
			res.status(200).json(result)
		});
	});
});

module.exports = router;
