(function() {
  'use strict';

  var Firebase = require('firebase');

  const db = Firebase.database();
  var _gamesRef = db.ref('games');
  var _timelinesRef = db.ref('timelines');

  var buildMAMEWRTimeline = function() {
    _gamesRef.once('value', function(gamesSnapshot) {
      // Grab every MAME platform game in the database.
      var mameGamesArray = [];

      gamesSnapshot.forEach(function(game) {
        var gameData = game.val();
        let timeSinceEpoch = new Date(gameData.date).getTime();

        gameData.timeSinceEpoch = timeSinceEpoch;
        gameData.gameId = game.key;

        if (gameData.platform === 'MAME') {
          mameGamesArray.push(gameData);
        }
      });

      // Sort by date.
      mameGamesArray.sort(function(a, b) {
        return a.timeSinceEpoch - b.timeSinceEpoch;
      });

      var worldRecordTimeline = [];
      var currentWorldRecordScore = 0;
      mameGamesArray.forEach(function(game) {
        if (game.score > currentWorldRecordScore && game.score >= 850000) {
          worldRecordTimeline.push(game);
          currentWorldRecordScore = game.score;
        }
      });

      _timelinesRef.child('mameWRTimeline').set(worldRecordTimeline);

      console.log('Built MAME WR timeline');
    });
  };

  module.exports.build = function() {
    return buildMAMEWRTimeline();
  };
})();
