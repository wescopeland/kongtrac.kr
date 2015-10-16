(function() {

	'use strict';

	var Firebase = require('firebase');

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');
	var _playersRef = _fbRef.child('players');
	var _arcadePbRef = _fbRef.child('arcadePersonalBests');
	var _mamePbRef = _fbRef.child('mamePersonalBests');

	var buildPersonalBestTable = function() {
		
		_playersRef.once('value', function(playersSnapshot) {

			// Grab every player that we'll later iterate through.
			var playersObject = playersSnapshot.val();
			var playersArray = [];

			for (var key in playersObject) {
				if (playersObject.hasOwnProperty(key)) {

					var name = uncamelize(key);
					if (name === 'Dave Mc Crary') {
						name = 'Dave McCrary';
					}

					playersArray.push(name);
					
				}
			}

			// Iterate through every game for each player and find their Arcade and MAME PBs.
			var playerPbObject = {};
			playersArray.forEach(function(player) {

				_gamesRef.once('value', function(gamesSnapshot) {

					// Grab all of this player's games.
					var playerGames = [];
					gamesSnapshot.forEach(function(game) {

						var gameData = game.val();
						if (gameData.player === player) {
							playerGames.push({ data: gameData, key: game.key() });
						}

					});

					// Find their personal bests.
					var currentArcadePB = 0;
					var currentMAMEPB = 0;
					var currentArcadePBDate = null;
					var currentMAMEPBDate = null;
					var currentArcadeGameId = null;
					var currentMameGameId = null;
					playerGames.forEach(function(playerGame) {

						if ( (playerGame.data.platform === 'Arcade' || playerGame.data.platform === 'JAMMA') && playerGame.data.score > currentArcadePB) {
							currentArcadePB = playerGame.data.score;
							currentArcadePBDate = playerGame.data.date;
							currentArcadeGameId = playerGame.key;
						}

						if (playerGame.data.platform === 'MAME' && playerGame.data.score > currentMAMEPB) {
							currentMAMEPB = playerGame.data.score;
							currentMAMEPBDate = playerGame.data.date;
							currentMameGameId = playerGame.key;
						}

					});

					// Write to the personal best utility tables.
					_arcadePbRef.child(camelize(player)).set({
						playerName: player,
						score: currentArcadePB,
						date: currentArcadePBDate,
						id: currentArcadeGameId
					});

					_mamePbRef.child(camelize(player)).set({
						playerName: player,
						score: currentMAMEPB,
						date: currentMAMEPBDate,
						id: currentMameGameId
					});

				});

			});

			console.log('Reindexed personal best records for ' + playersArray.length + ' players.');

		});

	};

	function camelize(inputString) {

        if (inputString) {
            return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        }

    }

	function uncamelize(inputString) {

    	var separator = ' ';

    	// Assume separator is _ if no one has been provided.
		if(typeof(separator) == "undefined") {
		  separator = "_";
		}
	
		// Replace all capital letters by separator followed by lowercase one
		var text = inputString.replace(/[A-Z]/g, function (letter) {
		  return separator + letter.toUpperCase();
		});

		text = text[0].toUpperCase() + text.slice(1);
	
		// Remove first separator (to avoid _hello_world name)
		return text.replace("/^" + separator + "/", '');

    }

	module.exports.build = function() {
		return buildPersonalBestTable();
	};

})();