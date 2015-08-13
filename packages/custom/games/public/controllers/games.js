'use strict';

/* jshint -W098 */
angular.module('mean.games').controller('GamesController', ['$scope', 'Global', 'Games',
  function($scope, Global, Games) {
    $scope.global = Global;
    $scope.package = {
      name: 'games'
    };
  }
]);
