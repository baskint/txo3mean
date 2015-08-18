'use strict';

// Game authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.game.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        };
    };

    next();
};

module.exports = function(Games, app, auth) {

  var games = require('../controllers/games')(Games);

  app.route('/api/games')
    .get(games.all)
    .post(auth.requiresLogin, hasPermissions, games.create);
  app.route('/api/games/:gameId')
    .get(auth.isMongoId, games.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, games.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, games.destroy);

  // Finish with setting up the gameId param
  app.param('gameId', games.game);
};
