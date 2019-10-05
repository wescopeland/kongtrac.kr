(function() {
    'use strict';

    var Firebase = require('firebase');

    const db = Firebase.database();
    var _gamesRef = db.ref('games');
    var _timelinesRef = db.ref('timelines');

    var buildMillionPointTimeline = function() {
        _gamesRef.once('value', function(gamesSnapshot) {
            // Grab every KS game in the database.
            var millionPointGamesArray = [];

            gamesSnapshot.forEach(function(game) {
                var gameData = game.val();

                // If we only have a year...
                if (gameData.date.length === 4) {
                    var newDate = '06/06/' + gameData.date;
                    var splitDate = newDate.split('/');
                } else {
                    var splitDate = gameData.date.split('/');
                }

                var isoStringDate =
                    splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
                var isoDate = new Date(isoStringDate);

                gameData.isoDate = isoDate;
                gameData.gameId = game.key;

                if (gameData.score > 1000000) {
                    millionPointGamesArray.push(gameData);
                }
            });

            // Sort the millionPointGamesArray by date.
            millionPointGamesArray.sort(function(a, b) {
                return a.isoDate - b.isoDate;
            });

            var trackedPlayers = [];
            var millionPointTimeline = [];
            millionPointGamesArray.forEach(function(game) {
                if (
                    trackedPlayers.indexOf(game.player) === -1 &&
                    game.platform !== 'Simulation'
                ) {
                    millionPointTimeline.push(game);
                    trackedPlayers.push(game.player);
                }
            });

            _timelinesRef.child('millionTimeline').set(millionPointTimeline);
        });
    };

    module.exports.build = function() {
        return buildMillionPointTimeline();
    };
})();
