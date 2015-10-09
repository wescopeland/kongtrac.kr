(function() {
    'use strict';

    angular
        .module('kongtrac.player')
        .service('playerService', playerService);

    /* @ngInject */
    function playerService($q, $filter, $firebaseObject, $firebaseArray, gameService) {

    	// Private Variables
    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
    	var _player = {};

    	// Private Functions
    	// -- getPlayerGames(inputGamesArray);
    	// -- uncamelize(inputString);

    	this.buildPBMap = buildPBMap;
    	this.getArcadeBest = getArcadeBest;
    	this.getFirstKSDate = getFirstKSDate;
    	this.getFirstMillionDate = getFirstMillionDate;
    	this.getMAMEBest = getMAMEBest;
        this.getPlayerData = getPlayerData;

        ////////////////

        function buildPBMap(inputGamesDataArray) {

        	var unsanitizedPbMap = [];
        	var sanitizedPbMap = [];

        	var sortedGames = inputGamesDataArray;

        	sortedGames.forEach(function(game) {
        		game.date = moment(game.date, 'MM/DD/YYYY');
        	});

        	sortedGames = $filter('orderBy')(sortedGames, 'date');

        	var currentPB = 0;
        	sortedGames.forEach(function(game) {

        		if (game.score > currentPB) {

        			currentPB = game.score;
        			unsanitizedPbMap.push(game);

        		}

        	});

        	unsanitizedPbMap.forEach(function(pb) {

        		var newPbObject = {
        			x: moment(pb.date).utc().valueOf(),
        			y: pb.score
        		};

        		if (pb.platform === 'Arcade') {
        			newPbObject.fillColor = '#ff4136';
        		} else if (pb.platform === 'MAME') {
        			newPbObject.fillColor = '#0074d9';
        		} else {
                    newPbObject.fillColor = '#F012BE';
                }

        		sanitizedPbMap.push(newPbObject);

        	});

        	return sanitizedPbMap;

        }

        function getArcadeBest(inputGamesDataArray) {

        	var arcadeHighest = -1;

        	inputGamesDataArray.forEach(function(game) {

        		if ( (game.platform === 'Arcade' || game.platform === 'JAMMA') && (game.score > arcadeHighest) ) {
        			arcadeHighest = game.score;
        		}

        	});

        	if (arcadeHighest === -1) {
        		return null;
        	}

        	return arcadeHighest;

        }

        function getFirstKSDate(inputGamesDataArray) {

        	var firstKSDate = null;

        	inputGamesDataArray.forEach(function(game) {

        		if (game.isKillscreen) {

        			var currentDate = new Date(game.date);
        			
        			if (currentDate < firstKSDate || !firstKSDate) {
        				firstKSDate = currentDate;
        			}

        		}

        	});

        	return firstKSDate;

        }

        function getFirstMillionDate(inputGamesDataArray) {

        	var firstMillionDate = null;

        	inputGamesDataArray.forEach(function(game) {

        		if (game.isKillscreen && game.score > 1000000) {

        			var currentDate = new Date(game.date);

        			if (currentDate < firstMillionDate || !firstMillionDate) {
        				firstMillionDate = currentDate;
        			}

        		}

        	});

        	return firstMillionDate;

        }

        function getMAMEBest(inputGamesDataArray) {

        	var mameHighest = -1;

        	inputGamesDataArray.forEach(function(game) {

        		if (game.platform === 'MAME' && (game.score > mameHighest)) {
        			mameHighest = game.score;
        		}

        	});

        	if (mameHighest === -1) {
        		return null;
        	}

        	return mameHighest;

        }

        function getPlayerData(inputPlayer) {

        	var playerData = $firebaseObject(
        		_fbRef
        			.child('players')
        			.child(inputPlayer)
        	);

        	return $q(function(resolve, reject) {

        		playerData.$loaded().then(function() {

        			_player = playerData;
        			_player.name = uncamelize(playerData.$id);
        			_player.gameIds = getPlayerGameIds(_player.games);

        			resolve(_player);

        		});

        	});

        }

        function getPlayerGameIds(inputGamesObject) {

        	var gameIds = [];

        	for (var key in inputGamesObject) {
        		if (inputGamesObject.hasOwnProperty(key)) {
        			gameIds.push(inputGamesObject[key]);
        		}
        	}

        	return gameIds;

        }

        function getPlayerGames(inputGameIds) {

        	var gamesData = [];

        	return $q(function(resolve, reject) {

        		gameIds.forEach(function(gameId) {

	        		gameService.getGameData(gameId).then(function then(response) {
	        			gamesData.push(response);
	        		});

	        	});

	        	resolve(gamesData);

        	});

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

    }
    playerService.$inject = ["$q", "$filter", "$firebaseObject", "$firebaseArray", "gameService"];

})();