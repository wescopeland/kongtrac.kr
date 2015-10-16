(function() {

	'use strict';

	var Firebase = require('firebase');

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');
	var _timelinesRef = _fbRef.child('timelines');

	var buildKillscreenerTimeline = function() {

		_gamesRef.once('value', function(gamesSnapshot) {

			// Grab every KS game in the database.
			var killscreenGamesArray = [];

			gamesSnapshot.forEach(function(game) {

				var gameData = game.val();

				var splitDate = gameData.date.split('/');
				var isoStringDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
				var isoDate = new Date(isoStringDate);

				gameData.isoDate = isoDate;
				gameData.gameId = game.key();

				if (gameData.isKillscreen) {
					killscreenGamesArray.push(gameData);
				}

			});

			// Sort the killscreenGamesArray by date.
			killscreenGamesArray.sort(function(a, b) {
				return a.isoDate - b.isoDate;
			});

			var trackedPlayers = [];
			var killscreenTimeline = [];
			killscreenGamesArray.forEach(function(game) {

				if (trackedPlayers.indexOf(game.player) === -1 && game.platform !== 'Simulation') {

					killscreenTimeline.push(game);
					trackedPlayers.push(game.player);

				}

			});

			_timelinesRef.child('ksTimeline').set(killscreenTimeline);

		});

	};

	module.exports.build = function() {
		return buildKillscreenerTimeline();
	};

})();
