/**
 * Battle.net authentication configuration
 *
 * Credentials have been aquired via https://dev.battle.net and are accessible at https://dev.battle.net/apps/mykeys
 * The configuration is different whether we are in a development environment or in production
 */
var debug = process.env['DEBUG'] !== null;

/**
 * @type {{clientID: string Client public ID, clientSecret: string, callbackURL: string, scope: string}}
 */
module.exports = {
	clientID: debug ? "73sqymavgu3jsqn8vf5d5gfh98tpx3ac" : "3c98a589tk4rh64xne4c5wytw3pd5w63", // Client ID for authenticating website with Battle.net
	clientSecret: debug ? "5c4vdRDpDfCaaFUPb7RusGX6p3p6KS6M" : "p9mRFMnZBMFuRQUsxrfk3Av7kTJsZQHT", // Client secret, used for decrypting data sent by Battle.net
	callbackURL: (debug ? "https://localhost:3000/" : "https://totalrp3.info/") + "user/auth/bnet/callback", // Callback url called by Battle.net with the data
	scope: 'wow.profile' // The scope of our application. We only need to access the World of Warcraft profile
};