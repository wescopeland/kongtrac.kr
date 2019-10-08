(function() {
  'use strict';

  var Firebase = require('firebase');

  const db = Firebase.database();

  var _gamesRef = db.ref('games');
  var _timelinesRef = db.ref('timelines');

  var buildArcadeWRTimeline = function() {
    _gamesRef.once('value', function(gamesSnapshot) {
      // Grab every arcade platform game in the database.
      var arcadeGamesArray = [];

      gamesSnapshot.forEach(function(game) {
        var gameData = game.val();
        let timeSinceEpoch = new Date(gameData.date).getTime();

        gameData.timeSinceEpoch = timeSinceEpoch;
        gameData.gameId = game.key;

        if (gameData.platform === 'Arcade') {
          arcadeGamesArray.push(gameData);
        }
      });

      // Sort by date.
      arcadeGamesArray.sort(function(a, b) {
        return a.timeSinceEpoch - b.timeSinceEpoch;
      });

      var worldRecordTimeline = [];
      var currentWorldRecordScore = 0;
      arcadeGamesArray.forEach(function(game) {
        if (game.score > currentWorldRecordScore && game.score >= 800000) {
          worldRecordTimeline.push(game);
          currentWorldRecordScore = game.score;
        }
      });

      _timelinesRef.child('arcadeWRTimeline').set(worldRecordTimeline);
      console.log('Built Arcade WR timeline');
    });
  };

  module.exports.build = function() {
    return buildArcadeWRTimeline();
  };
})();
