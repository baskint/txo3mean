'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    _ = require('lodash');

module.exports = function(Games) {

    return {
        /**
         * Find game by id
         */
        game: function(req, res, next, id) {
            Game.load(id, function(err, game) {
                if (err) return next(err);
                if (!game) return next(new Error('Failed to load game ' + id));
                req.game = game;
                next();
            });
        },
        /**
         * Create a game
         */
        create: function(req, res) {
            var game = new Game(req.body);
            game.user = req.user;

            game.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the game'
                    });
                }

                Games.events.publish('create', {
                    description: req.user.name + ' created ' + req.body.name + ' game.'
                });

                res.json(game);
            });
        },
        /**
         * Update a game
         */
        update: function(req, res) {
            var game = req.game;

            game = _.extend(game, req.body);


            game.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the game'
                    });
                }

                Games.events.publish('update', {
                    description: req.user.name + ' updated ' + req.body.name + ' game.'
                });

                res.json(game);
            });
        },
        /**
         * Delete a game
         */
        destroy: function(req, res) {
            var game = req.game;


            game.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the game'
                    });
                }

                Games.events.publish('remove', {
                    description: req.user.name + ' deleted ' + game.name + ' game.'
                });

                res.json(game);
            });
        },
        /**
         * Show a game
         */
        show: function(req, res) {

            Games.events.publish('view', {
                description: req.user.name + ' read ' + req.game.name + ' game.'
            });

            res.json(req.game);
        },
        /**
         * List of Games
         */
        all: function(req, res) {
            var query = req.acl.query('Game');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, games) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the games'
                    });
                }

                res.json(games)
            });

        }
    };
}
