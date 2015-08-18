'use strict';

//Setting up route
angular.module('mean.games').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all games', {
        url: '/games',
        templateUrl: '/games/views/list.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('create game', {
        url: '/games/create',
        templateUrl: '/games/views/create.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('edit game', {
        url: '/games/:gameId/edit',
        templateUrl: '/games/views/edit.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('game by id', {
        url: '/games/:gameId',
        templateUrl: '/games/views/view.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      });
  }
]);
