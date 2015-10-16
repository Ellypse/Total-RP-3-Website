// Generated by CoffeeScript 1.10.0
(function() {
  var appRoot, routes;

  appRoot = require('app-root-path');

  routes = function(app) {
    return app.use('/', appReq('/routes/index')).use("/wiki", appReq('/routes/wiki')).use("/user", appReq('/routes/user')).use('/character', appReq('/routes/character')).use("/storyline", appReq('/routes/storyline'));
  };

  module.exports = routes;

}).call(this);

//# sourceMappingURL=routes.js.map
