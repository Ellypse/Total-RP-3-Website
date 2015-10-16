debug = process.env.DEBUG != null

module.exports = {
	clientID: if debug then "73sqymavgu3jsqn8vf5d5gfh98tpx3ac" else"3c98a589tk4rh64xne4c5wytw3pd5w63"
	clientSecret: if debug then "5c4vdRDpDfCaaFUPb7RusGX6p3p6KS6M" else "p9mRFMnZBMFuRQUsxrfk3Av7kTJsZQHT"
	callbackURL: if debug then "https://localhost:3000/user/auth/bnet/callback" else "https://totalrp3.info/user/auth/bnet/callback"
	scope: 'wow.profile'
};