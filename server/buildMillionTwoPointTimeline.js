(function() {

	'use strict';

	var Firebase = require('firebase');

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');
	var _timelinesRef = _fbRef.child('timelines');

	var buildMillionTwoPointTimeline = function() {

		_gamesRef.once('value', function(gamesSnapshot) {

			// Grab every KS game in the database.
			var millionTwoPointGamesArray = [];

			gamesSnapshot.forEach(function(game) {

				var gameData = game.val();

				var splitDate = gameData.date.split('/');
				var isoStringDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
				var isoDate = new Date(isoStringDate);

				gameData.isoDate = isoDate;
				gameData.gameId = game.key();

				if (gameData.score > 1200000) {
					millionTwoPointGamesArray.push(gameData);
				}

			});

			// Sort the millionTwoPointGamesArray by date.
			millionTwoPointGamesArray.sort(function(a, b) {
				return a.isoDate - b.isoDate;
			});

			var trackedPlayers = [];
			var millionTwoPointTimeline = [];
			millionTwoPointGamesArray.forEach(function(game) {

				if (trackedPlayers.indexOf(game.player) === -1 && game.platform !== 'Simulation') {

					millionTwoPointTimeline.push(game);
					trackedPlayers.push(game.player);

				}

			});

			_timelinesRef.child('millionTwoTimeline').set(millionTwoPointTimeline);

		});

	};

	module.exports.build = function() {
		return buildMillionTwoPointTimeline();
	};

})();
