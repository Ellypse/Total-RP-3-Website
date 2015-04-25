var express = require('express');
var router = express.Router();
var raneto = require("raneto-core");
var path = require("path"),
	fs = require('fs'),
	_s = require('underscore.string'),
	moment = require('moment'),
	marked = require('marked'),
	validator = require('validator'),
config = require("../config");

renato:slugToTitle = function(slug) {
	slug = slug.replace('.md', '').trim();
	return path.basename(slug);
};

/* GET home page. */
router.get('/*', function(req, res, next) {
	if(!req.params[0]){
		req.params[0] = "/";
	}
	if (req.query.search) {
			var searchQuery = validator.toString(validator.escape(_s.stripTags(req.query.search))).trim(),
				searchResults = raneto.doSearch(searchQuery),
				pageListSearch = raneto.getPages('');

			return res.render('search', {
				config: config,
				pages: pageListSearch,
				search: searchQuery,
				searchResults: searchResults,
				body_class: 'page-search'
			});
		}
		else if (req.params[0]) {
			var slug = req.params[0];
			if (slug == '/') slug = '/index';

			var pageList = raneto.getPages(slug),
				filePath = path.normalize(raneto.config.content_dir + slug);
			if (!fs.existsSync(filePath)) filePath += '.md';

			if (slug == '/index' && !fs.existsSync(filePath)) {
				return res.render('home', {
					config: config,
					pages: pageList,
					body_class: 'page-home'
				});
			} else {
				fs.readFile(filePath, 'utf8', function (err, content) {
					if (err) {
						err.status = '404';
						err.message = 'Whoops. Looks like this page doesn\'t exist.';
						return next(err);
					}

					// Process Markdown files
					if (path.extname(filePath) == '.md') {
						// File info
						var stat = fs.lstatSync(filePath);
						// Meta
						var meta = raneto.processMeta(content);
						content = raneto.stripMeta(content);
						if (!meta.title) meta.title = raneto.slugToTitle(filePath);
						// Content
						content = raneto.processVars(content);
						var html = marked(content);

						return res.render('page', {
							config: config,
							pages: pageList,
							meta: meta,
							content: html,
							body_class: 'page-' + raneto.cleanString(slug),
							last_modified: moment(stat.mtime).format('Do MMM YYYY')
						});
					} else {
						// Serve static file
						res.sendfile(filePath);
					}
				});
			}
		} else {
			next();
		}
});

module.exports = router;
