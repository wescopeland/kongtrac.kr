(function() {

	'use strict';

	var Firebase = require('firebase');

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');
	var _timelinesRef = _fbRef.child('timelines');

	var buildArcadeWRTimeline = function() {

		_gamesRef.once('value', function(gamesSnapshot) {

			// Grab every arcade platform game in the database.
			var arcadeGamesArray = [];

			gamesSnapshot.forEach(function(game) {

				var gameData = game.val();

				var splitDate = gameData.date.split('/');
				var isoStringDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
				var isoDate = new Date(isoStringDate);

				gameData.isoDate = isoDate;
				gameData.gameId = game.key();

				if (gameData.platform === 'Arcade') {
					arcadeGamesArray.push(gameData);
				}

			});

			// Sort by date.
			arcadeGamesArray.sort(function(a, b) {
				return a.isoDate - b.isoDate;
			});

			var worldRecordTimeline = [];
			var currentWorldRecordScore = 0;
			arcadeGamesArray.forEach(function(game) {

				if (game.score > currentWorldRecordScore) {

					worldRecordTimeline.push(game);
					currentWorldRecordScore = game.score;

				}

			});

			_timelinesRef.child('arcadeWRTimeline').set(worldRecordTimeline);

		});

	};

	module.exports.build = function() {
		return buildArcadeWRTimeline();
	};

})();
