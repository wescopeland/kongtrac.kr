(function() {

	'use strict';

	var Firebase = require('firebase');

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');
	var _timelinesRef = _fbRef.child('timelines');

	var buildCombinedWRTimeline = function() {

		_gamesRef.once('value', function(gamesSnapshot) {

			// Grab every game in the database.
			var completeGamesArray = [];

			gamesSnapshot.forEach(function(game) {

				var gameData = game.val();

				var splitDate = gameData.date.split('/');
				var isoStringDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
				var isoDate = new Date(isoStringDate);

				gameData.isoDate = isoDate;
				gameData.gameId = game.key();

				completeGamesArray.push(gameData);

			});

			// Sort the killscreenGamesArray by date.
			completeGamesArray.sort(function(a, b) {
				return a.isoDate - b.isoDate;
			});

			var worldRecordTimeline = [];
			var currentWorldRecordScore = 0;
			completeGamesArray.forEach(function(game) {

				if (game.score > currentWorldRecordScore && game.platform !== 'Simulation' && game.score >= 800000) {

					worldRecordTimeline.push(game);
					currentWorldRecordScore = game.score;

				}

			});

			_timelinesRef.child('combinedWRTimeline').set(worldRecordTimeline);

		});

	};

	module.exports.build = function() {
		return buildCombinedWRTimeline();
	};

})();
