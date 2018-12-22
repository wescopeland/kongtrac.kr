(function() {
    'use strict';

    var Firebase = require('firebase');

    var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
    var _gamesRef = _fbRef.child('games');

    var buildPerfectGame = function() {
        _gamesRef.once('value', function(gamesSnapshot) {
            // Grab every game that we'll create the max of.
            var completeGamesArray = [];

            gamesSnapshot.forEach(function(game) {
                var gameData = game.val();
                if (gameData.hasCompleteData) {
                    completeGamesArray.push(gameData);
                }
            });

            var maxBoardScores = [];
            for (var i = 0; i <= 115; i += 1) {
                maxBoardScores[i] = 0;
            }

            // Get the max of each board in the database.
            completeGamesArray.forEach(function(game) {
                for (var i = 0; i <= 115; i += 1) {
                    if (game.boardScores[i]) {
                        if (game.boardScores[i] > maxBoardScores[i]) {
                            maxBoardScores[i] = game.boardScores[i];
                        }
                    } else {
                        break;
                    }
                }
            });

            var maxDeaths = [
                {
                    board: 0,
                    points: 0
                },
                {
                    board: 0,
                    points: 0
                },
                {
                    board: 0,
                    points: 0
                },
                {
                    board: 0,
                    points: 0
                }
            ];

            completeGamesArray.forEach(function(game) {
                // The first three deaths can be non-KS deaths.
                for (var i = 0; i < 3; i += 1) {
                    if (game.deaths[i].points > maxDeaths[i].points) {
                        maxDeaths[i] = game.deaths[i];
                    }
                }

                // The last death must be on 22-1.
                if (
                    game.deaths[3].board === 116 &&
                    game.deaths[3].points > maxDeaths[3].points
                ) {
                    maxDeaths[3] = game.deaths[3];
                }
            });

            var perfectGame = {};
            perfectGame.deaths = maxDeaths;
            perfectGame.boardScores = maxBoardScores;
            perfectGame.score = 0;

            // Get the perfect game's score.
            for (var i = 0; i < perfectGame.boardScores.length; i += 1) {
                perfectGame.score += perfectGame.boardScores[i];
            }

            for (var i = 0; i < perfectGame.deaths.length; i += 1) {
                perfectGame.score += perfectGame.deaths[i].points;
            }

            var currentDate = new Date();
            perfectGame.date =
                currentDate.getMonth() +
                1 +
                '/' +
                currentDate.getDate() +
                '/' +
                currentDate.getFullYear();

            _gamesRef.child('perfectGame').set({
                score: perfectGame.score,
                boardScores: perfectGame.boardScores,
                deaths: perfectGame.deaths,
                hasCompleteData: true,
                isKillscreen: true,
                platform: 'Simulation',
                player: 'Kongtrackr AI',
                date: perfectGame.date
            });

            console.log('Built perfect game.');
        });
    };

    module.exports.build = function() {
        return buildPerfectGame();
    };
})();
