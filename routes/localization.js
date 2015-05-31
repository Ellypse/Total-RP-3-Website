/**
 * Node modules
 */
var express = require('express'),
	appRoot = require('app-root-path'),
	router = express.Router(),
	debug = require('debug')('uploader'),
	fs = require('fs');

/**
 * Controllers
 */
var parser = require(appRoot + "/controllers/lua-parser/parser"),
	isAuthenticated = require(appRoot + "/controllers/authentication/passport-auth").isAuthenticated;
/**
 * Services
 */
var LocaleService = require(appRoot + "/services/locale-service");

/* GET home page. */
router.get('/', isAuthenticated, function (req, res){
	LocaleService.findAll().then(
		function(locales){
			res.render("localization/index", {user: req.user, locales : locales});
		},
		function(error){
			console.warn(error);
			res.render("error", {message:"An error has occurred while loading data from the database."})
		}
	);
});

/**
 * POST /upload
 * Upload a locale.lua file
 */
router.post('/upload', isAuthenticated, function(req, res, next){
	fs.readFile(req.files.file.path, 'utf8', function(err, data){
		if(err) throw err;
		fs.unlink(req.files.file.path);
		res.json(LocaleService.updateLocale(parser.parseLocale(data)));
	});
});


module.exports = router;