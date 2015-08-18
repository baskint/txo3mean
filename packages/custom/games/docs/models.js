exports.models = {

  Game: {
    id: 'Game',
    required: ['name', 'description'],
    properties: {

      name: {
        type: 'string',
        description: 'Name of the game'
      },
      description: {
        type: 'string',
        description: 'description of the game'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the game'
      }
    }
  }
};
