(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .service('submitGameService', submitGameService);

    /* @ngInject */
    function submitGameService($q, $firebaseObject, $firebaseArray) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');

    	this.checkAndSetWeights = checkAndSetWeights;
        this.submitGame = submitGame;

        ////////////////

        function camelize(inputString) {

        	return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
			}).replace(/\s+/g, '');

        }

        function checkAndSetWeights() {

        	
        	
        }

        function submitGame(inputGameProperties) {
        
        	var gameList = $firebaseArray(
        		_fbRef
        			.child('games')
        	);

        	// Load both the gameList and playerList, then post the game.
        	gameList.$loaded().then(function() {

        		var newGame = inputGameProperties;
        		console.log(newGame);

	        	gameList.$add(newGame).then(function(newGameReference) {

	        		// Add this game to the player's array of games.
	        		var playerGamesArray = $firebaseArray(
	        			_fbRef
	        				.child('players')
	        				.child(camelize(newGame.player))
	        				.child('games')
	        		);

	        		playerGamesArray.$loaded().then(function() {
	        			playerGamesArray.$add(newGameReference.key());
	        		});

	        		// Check if this is a player's PB.
	        		var personalBestData = $firebaseObject(
	        			_fbRef
	        				.child('personalBests')
	        		);

	        		personalBestData.$loaded().then(function() {

	        			console.log(personalBestData);

	        			if ( !personalBestData[camelize(newGame.player)] ) {

	        				var newPersonalBest = {
	        					score: newGame.score,
	        					gameId: newGameReference.key(),
	        					platform: newGame.platform,
	        					player: newGame.player,
	        					date: String(newGame.date)
	        				};

	        				personalBestData[camelize(newGame.player)] = newPersonalBest;


	        			} else if ( personalBestData[camelize(newGame.player)].score < newGame.score ) {

	        				personalBestData[camelize(newGame.player)] = {
	        					score: newGame.score,
	        					gameId: newGameReference.key(),
	        					platform: newGame.platform,
	        					player: newGame.player,
	        					date: String(newGame.date)
	        				};

	        			}

	        			personalBestData.$save();

	        		});

	        	});

        	});

        }

    }
})();