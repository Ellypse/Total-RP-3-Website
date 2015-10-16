# Node module importation
fs = require 'fs'
approot = require 'app-root-path'
debug = require('debug')('backgrounds')

removeRetinas = (background) ->
	return background.indexOf("@2x") < 0

debug "Defining backgrounds controller"
backgrounds =
	backgroundFolder: approot + '/public/images/backgrounds'

	# Pick one random background within the backgrounds folder and returns the filename
	pickOne: (specificOne) ->

		debug "Opening backgrounds directory and listing available backgrounds"
		backgrounds = fs.readdirSync this.backgroundFolder;
		debug "Successfully read backgrounds folder", backgrounds

		debug "Removing retina backgrounds from the array"
		backgrounds = backgrounds.filter removeRetinas
		debug "Successfully filtered backgrounds array", backgrounds

		if specificOne
			debug "A specific background has been requested, looking for it", specificOne
			for background in backgrounds
				if background.indexOf(specificOne) > -1
					debug "Found requested background!", background
					return background
			debug "Requested background was not found. Falling back to random background"

		backgroundIndex = Math.floor(Math.random() * backgrounds.length)
		debug "Random background picked", backgroundIndex, backgrounds[backgroundIndex]
		backgrounds[backgroundIndex]

module.exports = backgrounds;