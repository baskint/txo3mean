'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Games = new Module('games');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Games.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Games.routes(app, auth, database);

  Games.aggregateAsset('css', 'games.css');


  //We are adding a link to the main menu for all authenticated users
  Games.menus.add({
    'roles': ['authenticated'],
    'title': 'Games',
    'link': 'all games'
  });
  Games.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Game',
    'link': 'create game'
  });

  Games.events.design({
    //http://fontawesome.io/icons
    icon: 'fa-file-text',
    color: '#8FD5FF'
  });


  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Games.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Games.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Games.settings(function (err, settings) {
      //you now have the settings object
    });
    */

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);

  return Games;
});
