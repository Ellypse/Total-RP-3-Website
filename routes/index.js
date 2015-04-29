var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	var backgrounds = fs.readdirSync("./public/images/backgrounds");
	res.render('index',{backgrounds:backgrounds});

});

module.exports = router;
