var express = require('express'),
	router = express.Router(),
	path = require("path"),
	fs = require('fs'),
	_s = require('underscore.string'),
	moment = require('moment'),
	marked = require('marked'),
	validator = require('validator'),
	debug = require("debug")("wiki");

var raneto = require('../controllers/raneto-custom/index'),
	config = require("../config/raneto");

router.get('/*', function (req, res, next) {
	if (req.query.search) {
		var searchQuery = validator.toString(validator.escape(_s.stripTags(req.query.search))).trim();
		var searchResults = raneto.doSearch(searchQuery);
		var pageListSearch = raneto.getPages('');
		return res.render('wiki/search.jade', {
			config: config,
			pages: pageListSearch,
			search: searchQuery,
			searchResults: searchResults
		});
	}
	else {
		var requestedPage = req.params[0] || "/index";

		if (requestedPage === '/index') {
			return res.render('wiki/home.jade', {
				config: config,
				pages: pageList,
				body_class: 'page-home',
				username: "TEST"
			});
		}

		var filePath = path.normalize(config.content_dir + requestedPage);

		if(!path.extname(filePath)){
			debug("No file extension found in URL, serving wiki page");
			var pageList = raneto.getPages(filePath);
			filePath = filePath + ".md";

			fs.readFile(filePath, 'utf8', function (err, content) {
				if (err) {
					err.status = '404';
					err.message = 'Whoops. Looks like this page doesn\'t exist.';
					return next(err);
				}

				var stat = fs.lstatSync(filePath);
				var meta = raneto.processMeta(content);
				content = raneto.stripMeta(content);
				if (meta.title == null) {
					meta.title = raneto.slugToTitle(filePath);
				}
				var markdownContent = raneto.processVars(content);
				var html = marked(markdownContent);
				meta.description = html.replace(/<(?:.|\n)*?>/gm, '').substring(0, 250);
				meta.description += "…";
				res.render('./wiki/page.jade', {
					config: config,
					pages: pageList,
					meta: meta,
					content: html,
					markdownContent: markdownContent,
					last_modified: moment(stat.mtime).format('Do MMM YYYY HH:mm')
				});
			})
		}
		else{
			debug("File extension found in URL, serving static file");
			fs.exists(filePath, function(exists){
				if(!exists){
					res.sendStatus(404);
				}
				else{
					res.sendFile(filePath, {
						root: path.join(__dirname, "..")
					});
				}
			});
		}
	}
});

module.exports = router;