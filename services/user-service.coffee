User = appReq '/models/user'

exports.addUser = (user, next) ->
	newUser = new User
		username: user.battlenet.battletag
		battlenet:
			accessToken: user.accessToken
			id: user.battlenet.id
			battletag: user.battlenet.battletag
	newUser.save (err)	->
		next(err if err)

exports.findById = (id, next) ->
	User.findOne 'battlenet.id': id, (err, user) ->
		if(err)
			next(err)
		else
			next null, user

exports.update = (condition, values, callback) ->
	User.update condition, values, callback