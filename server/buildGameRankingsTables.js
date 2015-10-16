(function() {

	'use strict';

	var Firebase = require('firebase');

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');
	var _combinedTopGamesRef = _fbRef.child('topGamesCombined');
	var _arcadeTopGamesRef = _fbRef.child('topGamesArcade');
	var _mameTopGamesRef = _fbRef.child('topGamesMame');

	var buildGameRankings = function() {

		_gamesRef.once('value', function(gamesSnapshot) {

			// Grab every single game in the database.
			var completeGamesArray = [];

			gamesSnapshot.forEach(function(game) {

				var gameData = game.val();
				completeGamesArray.push(gameData);

			});

			completeGamesArray.sort(function(a, b) {
				return b.score - a.score;
			});

			// Get the top ten combined platform games.
			var combinedTopGames = [];
			for (var i = 0; i < 10; i += 1) {
				combinedTopGames.push(completeGamesArray[i]);
			}

			// Get the separated platform top tens.
			var arcadeTopGames = [];
			var mameTopGames = [];
			var arcadePushCount = 0;
			var mamePushCount = 0;
			for (var i = 0; i < 50; i += 1) {

				if ((completeGamesArray[i].platform === 'Arcade' || completeGamesArray[i].platform === 'JAMMA') && arcadePushCount < 10) {

					arcadeTopGames.push(completeGamesArray[i]);
					arcadePushCount += 1;

				} else if (completeGamesArray[i].platform === 'MAME' && mamePushCount < 10) {

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
