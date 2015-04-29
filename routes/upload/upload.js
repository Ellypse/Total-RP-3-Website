var express = require('express');
var router = express.Router();
var fs = require('fs');

/* File upload form */
router.get('/', function(req, res, next) {
	var backgrounds = fs.readdirSync("./public/images/backgrounds");
	res.render('index',{backgrounds:backgrounds});

});

/* List all the files available */
router.get('/files', function(req, res, next) {
	var backgrounds = fs.readdirSync("./public/images/backgrounds");
	res.render('index',{backgrounds:backgrounds});

});

/* Authenticate form */
router.get('/authenticate', function(req, res, next) {
	var backgrounds = fs.readdirSync("./public/images/backgrounds");
	res.render('index',{backgrounds:backgrounds});

});

module.exports = router;
