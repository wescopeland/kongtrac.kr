(function() {
  'use strict';

  var Firebase = require('firebase');

  const db = Firebase.database();
  var _gamesRef = db.ref('games');
  var _timelinesRef = db.ref('timelines');

  var buildCombinedWRTimeline = function() {
    _gamesRef.once('value', function(gamesSnapshot) {
      // Grab every game in the database.
      var completeGamesArray = [];

      gamesSnapshot.forEach(function(game) {
        var gameData = game.val();
        let timeSinceEpoch = new Date(gameData.date).getTime();

        gameData.timeSinceEpoch = timeSinceEpoch;
        gameData.gameId = game.key;

        completeGamesArray.push(gameData);
      });

      // Sort the killscreenGamesArray by date.
      completeGamesArray.sort(function(a, b) {
        return a.timeSinceEpoch - b.timeSinceEpoch;
      });

      var worldRecordTimeline = [];
      var currentWorldRecordScore = 0;
      completeGamesArray.forEach(function(game) {
        if (
          game.score > currentWorldRecordScore &&
          game.platform !== 'Simulation' &&
          game.score >= 800000
        ) {
          worldRecordTimeline.push(game);
          currentWorldRecordScore = game.score;
        }
      });

      _timelinesRef.child('combinedWRTimeline').set(worldRecordTimeline);
      console.log('Built Combined WR timeline');
    });
  };

  module.exports.build = function() {
    return buildCombinedWRTimeline();
  };
})();
