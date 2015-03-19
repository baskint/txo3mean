'use strict';

angular.module('mean.games').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('games example page', {
      url: '/games/example',
      templateUrl: 'games/views/index.html'
    });
  }
]);
