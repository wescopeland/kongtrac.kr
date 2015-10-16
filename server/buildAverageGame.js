(function() {

	'use strict';

	var Firebase = require('firebase');

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');

	var buildAverageGame = function() {

		_gamesRef.once('value', function(gamesSnapshot) {

			// Grab every game that we'll create the average of.
			var completeGamesArray = [];

			gamesSnapshot.forEach(function(game) {

				var gameData = game.val();
				if (gameData.hasCompleteData && gameData.isKillscreen) {
					completeGamesArray.push(gameData);
				}

			});

			var sumBoardScores = [];
			for (var i = 0; i <= 115; i += 1) {
				sumBoardScores[i] = 0;
			}

			// Add each board to the sumBoardScores array. We need the sum of every single board.
			completeGamesArray.forEach(function(game) {

				for (var i = 0; i <= 115; i += 1) {
					sumBoardScores[i] += game.boardScores[i];
				}

			});

			// Get the average of each board.
			var averageBoardScores = sumBoardScores;
			for (var i = 0; i <= 115; i += 1) {
				averageBoardScores[i] = Math.round((averageBoardScores[i] / completeGamesArray.length) / 100) * 100;
			}

			var sumDeaths = [
				{
					board: 0,
					points: 0
				},
				{
					board: 0,
					points: 0,
				},
				{
					board: 0,
					points: 0,
				},
				{
					board: 0,
					points: 0
				}
			];

			completeGamesArray.forEach(function(game) {

				for (var i = 0; i < 4; i += 1) {

					sumDeaths[i].board += game.deaths[i].board;
					sumDeaths[i].points += game.deaths[i].points;

				}

			});

			var averageDeaths = sumDeaths;
			for (var i = 0; i < 4; i += 1) {
				averageDeaths[i].board = Math.round(averageDeaths[i].board / completeGamesArray.length);
				averageDeaths[i].points = Math.round((averageDeaths[i].points / completeGamesArray.length) / 100) * 100;
			}

			var averageGame = {};
			averageGame.deaths = averageDeaths;
			averageGame.boardScores = averageBoardScores;
			averageGame.score = 0;

			// Get the average game's score.
			for (var i = 0; i < averageGame.boardScores.length; i += 1) {
				averageGame.score += averageGame.boardScores[i];
			}

			for (var i = 0; i < averageGame.deaths.length; i += 1) {
				averageGame.score += averageGame.deaths[i].points;
			}

			var currentDate = new Date();
			averageGame.date = (currentDate.getMonth() + 1) + '/' + (currentDate.getDate()) + '/' + currentDate.getFullYear();

			_gamesRef.child('averageGame').set({
				score: averageGame.score,
				boardScores: averageGame.boardScores,
				deaths: averageGame.deaths,
				hasCompleteData: true,
				isKillscreen: true,
				platform: 'Simulation',
				player: 'Kongtrackr AI',
				date: averageGame.date
			});

			console.log('Built average game.');

		});

	};

	module.exports.build = function() {
		return buildAverageGame();
	};

})();