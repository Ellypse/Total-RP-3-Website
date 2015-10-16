# Node modules
express = require 'express'
router = express.Router()
path = require "path"
fs = require 'fs'
_s = require 'underscore.string'
moment = require 'moment'
marked = require 'marked'
validator = require 'validator'
debug = require("debug")("wiki")

# Controllers
raneto = appReq '/controllers/raneto-custom'

# Config
config = appReq "/config"

#Services
User = appReq "/services/user-service"

# GET home page
router.get '/*', (req, res, next) ->

	username = req.user.username?

	# Search
	if req.query.search
		searchQuery = validator.toString validator.escape _s.stripTags req.query.search
			.trim()

		searchResults = raneto.doSearch searchQuery
		pageListSearch = raneto.getPages ''

		return res.render 'wiki/search.jade',
			config: config.wiki
			pages: pageListSearch
			search: searchQuery
			searchResults: searchResults
			body_class: 'page-search'
			battleTag: username

	else
		requestedPage = req.params[0] ? "/index"
		pageList = raneto.getPages requestedPage

		# Homepage
		if requestedPage is '/index'
			return res.render('wiki/home.jade'
				config: config.wiki
				pages: pageList
				body_class: 'page-home'
				username: username

		filePath = path.normalize (raneto.config.content_dir + requestedPage)
		if not fs.existsSync filePath then filePath += '.md'


		#Specific page / static ressource
		fs.readFile filePath, 'utf8', (err, content) ->
			if err
				err.status = '404'
				err.message = 'Whoops. Looks like this page doesn\'t exist.'
				return next err

			# Process Markdown files
			if path.extname filePath is '.md'
				# File info
				stat = fs.lstatSync filePath
				# Meta
				meta = raneto.processMeta content
				content = raneto.stripMeta content

				meta.title ?= raneto.slugToTitle filePath
				markdownContent = content
				# Content
				content = raneto.processVars markdownContent
				html = marked content
				meta.description = html.replace /<(?:.|\n)*?>/gm, ''
						.substring 0, 250
				meta.description += "…"

				res.render './wiki/page.jade',
					config: config.wiki
					pages: pageList
					meta: meta
					content: html
					markdownContent: markdownContent
					body_class: 'page-' + raneto.cleanString slug
					last_modified: moment stat.mtime
						.format 'Do MMM YYYY'
					username: username
			else
				# Serve static file
				res.sendfile filePath

module.exports = router
