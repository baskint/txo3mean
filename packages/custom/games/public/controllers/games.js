'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Games, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(game) {
      if (!game || !game.user) return false;
      return MeanUser.isAdmin || game.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.game.permissions.push('test test');
        var game = new Games($scope.game);

        game.$save(function(response) {
          $location.path('games/' + response._id);
        });

        $scope.game = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(game) {
      if (game) {
        game.$remove(function(response) {
          for (var i in $scope.games) {
            if ($scope.games[i] === game) {
              $scope.games.splice(i, 1);
            }
          }
          $location.path('games');
        });
      } else {
        $scope.game.$remove(function(response) {
          $location.path('games');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var game = $scope.game;
        if (!game.updated) {
          game.updated = [];
        }
        game.updated.push(new Date().getTime());

        game.$update(function() {
          $location.path('games/' + game._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Games.query(function(games) {
        $scope.games = games;
      });
    };

    $scope.findOne = function() {
      Games.get({
        gameId: $stateParams.gameId
      }, function(game) {
        $scope.game = game;
      });
    };
  }
]);
