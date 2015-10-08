(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .service('submitGameService', submitGameService);

    /* @ngInject */
    function submitGameService($q, $firebaseObject, $firebaseArray) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');

    	this.checkAndSetWeights = checkAndSetWeights;
    	this.expandAbbreviatedPoints = expandAbbreviatedPoints;
        this.overwriteGame = overwriteGame;
        this.submitGame = submitGame;

        ////////////////

        function camelize(inputString) {

        	return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
			}).replace(/\s+/g, '');

        }

        function checkAndSetWeights() {

        	
        	
        }

        function expandAbbreviatedPoints(inputPointsString) {

        	var expansion;
        	var splitString = [];

        	if (inputPointsString.indexOf('.') > -1) {
        		splitString = inputPointsString.split('.');
        	} else if (inputPointsString.indexOf('-') > -1) {
        		splitString = inputPointsString.split('-');
        	} else if (inputPointsString.charAt(inputPointsString.length - 1) !== 0) {
        		return (Number(inputPointsString) * 1000);
        	} else {
        		return inputPointsString;
        	}

        	expansion = (Number(splitString[0]) * 1000) + (Number(splitString[1]) * 100);

        	return Number(expansion);

        }

        function overwriteGame(inputGameProperties, inputGameId) {

            // Load the game from the database.
            var gameData = $firebaseObject(
                _fbRef
                    .child('games')
                    .child(inputGameId)
            );

            return $q(function(resolve, reject) {

                gameData.$loaded().then(function() {

                    gameData.score = inputGameProperties.score;
                    gameData.platform = inputGameProperties.platform;
                    gameData.isKillscreen = inputGameProperties.isKillscreen;
                    gameData.date = inputGameProperties.date;

                    if (inputGameProperties.hasCompleteData) {
                        gameData.boardScores = inputGameProperties.boardScores;
                        gameData.deaths = inputGameProperties.deaths;
                    }

                    console.log(gameData);

                    gameData.$save();
                    resolve();

                });

            });

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
    submitGameService.$inject = ["$q", "$firebaseObject", "$firebaseArray"];
})();