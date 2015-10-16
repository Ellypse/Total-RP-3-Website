// Generated by CoffeeScript 1.10.0
(function() {
  var User, mongoose;

  mongoose = appReq('/database.js');

  User = mongoose.model('User', {
    username: String,
    rights: [String],
    email: String,
    battlenet: {
      accessToken: String,
      id: Number,
      battletag: String
    },
    created: {
      type: Date,
      "default": Date.now
    }
  });

  module.exports = User;

}).call(this);

//# sourceMappingURL=user.js.map
