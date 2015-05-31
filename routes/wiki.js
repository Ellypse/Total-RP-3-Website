/**
 * Node modules
 */
var express = require('express'),
	appRoot = require('app-root-path'),
	router = express.Router(),
	path = require("path"),
	fs = require('fs'),
	_s = require('underscore.string'),
	moment = require('moment'),
	marked = require('marked'),
	validator = require('validator'),
	debug = require("debug")("wiki");

/**
 * Controllers
 */
var raneto = require(appRoot + '/controllers/raneto-custom');

/**
 * Config
 */
var config = require(appRoot + "/config");

/**
 * Services
 */
var User = require(appRoot + "/services/user-service");

/* GET home page. */
router.get('/*', function(req, res, next){
	var username = req.user ? req.user.username : null;

	if(!req.params[0]){
		req.params[0] = "/";
	}

	/**
	 * Search
	 */
	if(req.query.search){
		var searchQuery = validator.toString(validator.escape(_s.stripTags(req.query.search))).trim(),
			searchResults = raneto.doSearch(searchQuery),
			pageListSearch = raneto.getPages('');

		return res.render('wiki/search.jade', {
			config: config.wiki,
			pages: pageListSearch,
			search: searchQuery,
			searchResults: searchResults,
			body_class: 'page-search',
			battleTag: battleTag
		});
	}
	else if(req.params[0]){
		var slug = req.params[0];
		if(slug == '/'){
			slug = '/index';
		}

		var pageList = raneto.getPages(slug),
			filePath = path.normalize(raneto.config.content_dir + slug);
		if(!fs.existsSync(filePath)){
			filePath += '.md';
		}

		/**
		 * Homepage
		 */
		if(slug == '/index' && !fs.existsSync(filePath)){
			return res.render('wiki/home.jade', {
				config: config.wiki,
				pages: pageList,
				body_class: 'page-home',
				username: username
			});
		}
		/**
		 * Specific page / static ressource
		 */
		else{

			fs.readFile(filePath, 'utf8', function(err, content){
				if(err){
					err.status = '404';
					err.message = 'Whoops. Looks like this page doesn\'t exist.';
					return next(err);
				}

				// Process Markdown files
				if(path.extname(filePath) == '.md'){
					// File info
					var stat = fs.lstatSync(filePath);
					// Meta
					var meta = raneto.processMeta(content);
					content = raneto.stripMeta(content);
					if(!meta.title){
						meta.title = raneto.slugToTitle(filePath);
					}
					var markdownContent = content;
					// Content
					content = raneto.processVars(markdownContent);
					var html = marked(content);
					meta.description = html.replace(/<(?:.|\n)*?>/gm, '').substring(0, 250) + "…";

					return res.render('./wiki/page.jade', {
						config: config.wiki,
						pages: pageList,
						meta: meta,
						content: html,
						markdownContent: markdownContent,
						body_class: 'page-' + raneto.cleanString(slug),
						last_modified: moment(stat.mtime).format('Do MMM YYYY'),
						username: username
					});
				}
				else{
					// Serve static file
					res.sendfile(filePath);
				}
			});
		}
	}
	else{
		next();
	}
});

module.exports = router;
