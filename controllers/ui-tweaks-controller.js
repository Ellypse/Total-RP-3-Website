/**
 * UI Tweaks Controller
 *
 * Provides UI tweaks function such as picking a random background
 *
 */
var debug = require('debug')('ui-tweaks'),
	fs = require('fs');

var UITweaksController = {
	backgroundFolder: './public/images/backgrounds',
	backgrounds: []
};

/**
 * Filter out retina images from an Array of file names.
 * Usage: var filteredArray = myArray.filter(removeRetinaImages);
 * @param image A file name
 * @returns {boolean} True if the image is not retina and should be kept, false if it is retina and should be filtered
 */
var removeRetinaImages = function(image) {
	return image.indexOf("@2x") < 0;
};

debug("Opening backgrounds directory and listing available backgrounds");
fs.readdir(UITweaksController.backgroundFolder, function(error, fileList){
	if (error) throw error;
	debug("Background folder read, file list retrieved", fileList);
	debug("Filtering out retina images from file list");
	var filteredFileList = fileList.filter(removeRetinaImages);
	debug("Retina images filtered out", filteredFileList);
	UITweaksController.backgrounds = filteredFileList;
});

UITweaksController.pickOne = function() {
	debug("Picking a random background");
	var randomBackgroundIndex = Math.floor(Math.random() * UITweaksController.backgrounds.length);
	debug("Random background pciked!", randomBackgroundIndex, UITweaksController.backgrounds[randomBackgroundIndex]);
	return UITweaksController.backgrounds[randomBackgroundIndex].slice(0, -4);
};

module.exports = UITweaksController;