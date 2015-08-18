'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Game operations',
      path: '/games',
      method: 'GET',
      summary: 'Get all Games',
      notes: '',
      type: 'Game',
      nickname: 'getGames',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/games',
      method: 'POST',
      summary: 'Create game',
      notes: '',
      type: 'Game',
      nickname: 'createGame',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Game to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Game',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
