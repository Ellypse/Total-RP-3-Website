module.exports = {
	clientID: process.env.DEBUG ? "73sqymavgu3jsqn8vf5d5gfh98tpx3ac" : "3c98a589tk4rh64xne4c5wytw3pd5w63",
	clientSecret: process.env.DEBUG ? "5c4vdRDpDfCaaFUPb7RusGX6p3p6KS6M" : "p9mRFMnZBMFuRQUsxrfk3Av7kTJsZQHT",
	callbackURL: process.env.DEBUG ? "https://localhost:3000/user/auth/bnet/callback" : "https://totalrp3.info/user/auth/bnet/callback",
	scope: 'wow.profile'
};