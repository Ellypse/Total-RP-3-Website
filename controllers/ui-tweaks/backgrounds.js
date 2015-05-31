/**
 * Node module importation
 */
var fs = require('fs');

var backgrounds = {
	backgroundFolder : './public/images/backgrounds',
	/**
	 * Pick one random background within the backgrounds folder and returns the filename
	 * @returns String Filename
	 */
	pickOne : function(){
		var backgrounds = fs.readdirSync(this.backgroundFolder);
		return backgrounds[Math.floor(Math.random() * backgrounds.length)];
	}
};

module.exports = backgrounds;