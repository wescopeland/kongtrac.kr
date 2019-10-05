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

                var splitDate = gameData.date.split('/');
                var isoStringDate =
                    splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
                var isoDate = new Date(isoStringDate);

                gameData.isoDate = isoDate;
                gameData.gameId = game.key;

                if (gameData.platform === 'MAME') {
                    mameGamesArray.push(gameData);
                }
            });

            // Sort by date.
            mameGamesArray.sort(function(a, b) {
                return a.isoDate - b.isoDate;
            });

            var worldRecordTimeline = [];
            var currentWorldRecordScore = 0;
            mameGamesArray.forEach(function(game) {
                if (
                    game.score > currentWorldRecordScore &&
                    game.score >= 850000
                ) {
                    worldRecordTimeline.push(game);
                    currentWorldRecordScore = game.score;
                }
            });

            _timelinesRef.child('mameWRTimeline').set(worldRecordTimeline);
        });
    };

    module.exports.build = function() {
        return buildMAMEWRTimeline();
    };
})();
