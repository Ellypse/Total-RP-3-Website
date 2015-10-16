# Node modules
router = require 'express'
	.Router()
uploaderDebug = require('debug')('uploader')
localizationDebug = require('debug')('localization')
fs = require 'fs'

#Controllers
localizationDebug 'Importing Lua parser controller'
parser = appReq "/controllers/lua-parser/parser"
localizationDebug 'Importing isAuthenticated function from passport'
isAuthenticated = appReq "/controllers/authentication/passport-auth"
	.isAuthenticated;

# Services
localizationDebug 'Importing Locale service'
LocaleService = appReq "/services/locale-service"

# GET home page
router.get '/', isAuthenticated, (req, res) ->
	localizationDebug 'GET localization/'
	localizationDebug 'Retrieving all locales from the dabatase'
	LocaleService.findAll()
		.then \
			(locales) ->
				localizationDebug 'Found locales', locales
				localizationDebug 'Rendering view'
				res.render "localization/index",
					user: req.user
					locales: locales
			(error) ->
				localizationDebug 'Error while retrieving locales', error
				res.render "error",
					message: "An error has occurred while loading data from the database."

# POST / upload
# Upload a locale.lua file
router.post '/upload', isAuthenticated, (req, res, next) ->
	uploaderDebug 'POST localization/upload'
	uploaderDebug 'Recevied files', req.files
	uploaderDebug 'Reading file from path', req.files.file.path
	fs.readFile req.files.file.path, 'utf8', (err, data) ->
		if err then throw err
		uploaderDebug 'Successufly read file. Content :', data

		uploaderDebug 'Deleting file'
		fs.unlink req.files.file.path

		uploaderDebug 'Updating/inserting locale in database'
		locale = LocaleService.updateLocale parser.parseLocale data
		uploaderDebug 'Outputing locale JSON'
		res.json locale

module.exports = router;
