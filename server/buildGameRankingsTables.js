(function() {
    'use strict';

    var Firebase = require('firebase');

    const db = Firebase.database();
    var _gamesRef = db.ref('games');
    var _combinedTopGamesRef = db.ref('topGamesCombined');
    var _arcadeTopGamesRef = db.ref('topGamesArcade');
    var _mameTopGamesRef = db.ref('topGamesMame');

    var buildGameRankings = function() {
        _gamesRef.once('value', function(gamesSnapshot) {
            // Grab every single game in the database.
            var completeGamesArray = [];

            gamesSnapshot.forEach(function(game) {
                var gameData = game.val();
                var gameId = game.key;
                gameData.gameId = gameId;
                completeGamesArray.push(gameData);
            });

            completeGamesArray.sort(function(a, b) {
                return b.score - a.score;
            });

            // Get the top ten combined platform games.
            var combinedTopGames = [];
            for (var i = 0; i <= 100; i += 1) {
                if (completeGamesArray[i].platform !== 'Simulation') {
                    combinedTopGames.push(completeGamesArray[i]);
                }
            }

            // Get the separated platform top tens.
            var arcadeTopGames = [];
            var mameTopGames = [];
            var arcadePushCount = 0;
            var mamePushCount = 0;
            for (var i = 0; i < 200; i += 1) {
                if (
                    (completeGamesArray[i].platform === 'Arcade' ||
                        completeGamesArray[i].platform === 'JAMMA') &&
                    arcadePushCount < 100
                ) {
                    arcadeTopGames.push(completeGamesArray[i]);
                    arcadePushCount += 1;
                } else if (
                    completeGamesArray[i].platform === 'MAME' &&
                    mamePushCount < 100
                ) {
                    mameTopGames.push(completeGamesArray[i]);
                    mamePushCount += 1;
                }
            }

            _combinedTopGamesRef.set(combinedTopGames);
            _arcadeTopGamesRef.set(arcadeTopGames);
            _mameTopGamesRef.set(mameTopGames);

            console.log('Built game rankings tables.');
        });
    };

    module.exports.build = function() {
        return buildGameRankings();
    };
})();
