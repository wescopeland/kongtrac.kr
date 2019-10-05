(function() {
    'use strict';

    var Firebase = require('firebase');

    const db = Firebase.database();
    var _gamesRef = db.ref('games');
    var _timelinesRef = db.ref('timelines');

    var buildMillionHundredPointTimeline = function() {
        _gamesRef.once('value', function(gamesSnapshot) {
            // Grab every KS game in the database.
            var millionHundredPointGamesArray = [];

            gamesSnapshot.forEach(function(game) {
                var gameData = game.val();

                var splitDate = gameData.date.split('/');
                var isoStringDate =
                    splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
                var isoDate = new Date(isoStringDate);

                gameData.isoDate = isoDate;
                gameData.gameId = game.key;

                if (gameData.score > 1100000) {
                    millionHundredPointGamesArray.push(gameData);
                }
            });

            // Sort the millionHundredPointGamesArray by date.
            millionHundredPointGamesArray.sort(function(a, b) {
                return a.isoDate - b.isoDate;
            });

            var trackedPlayers = [];
            var millionHundredPointTimeline = [];
            millionHundredPointGamesArray.forEach(function(game) {
                if (
                    trackedPlayers.indexOf(game.player) === -1 &&
                    game.platform !== 'Simulation'
                ) {
                    millionHundredPointTimeline.push(game);
                    trackedPlayers.push(game.player);
                }
            });

            _timelinesRef
                .child('millionHundredTimeline')
                .set(millionHundredPointTimeline);
        });
    };

    module.exports.build = function() {
        return buildMillionHundredPointTimeline();
    };
})();
