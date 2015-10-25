(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .service('submitGameService', submitGameService);

    /* @ngInject */
    function submitGameService($q, $rootScope, $firebaseObject, $firebaseArray, eventService) {

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
        	} else if (inputPointsString.length <= 2) {
        		return (Number(inputPointsString) * 1000);
        	} else {
        		return Number(inputPointsString);
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
                    gameData.hasCompleteData = inputGameProperties.hasCompleteData;

                    if (inputGameProperties.concealedDay) {
                        gameData.concealedDay = true;
                    }

                    if (inputGameProperties.concealedMonth) {
                        gameData.concealedMonth = true;
                    }

                    if (inputGameProperties.hasCompleteData) {
                        gameData.boardScores = inputGameProperties.boardScores;
                        gameData.deaths = inputGameProperties.deaths;
                    }

                    if (inputGameProperties.inputIsDayUnknown) {
                        gameData.concealedDay = true;
                    }

                    if (inputGameProperties.inputIsMonthUnknown) {
                        gameData.concealedMonth = true;
                    }

                    if (inputGameProperties.mameVersion) {
                        gameData.mameVersion = inputGameProperties.mameVersion;
                    }

                    if (inputGameProperties.isVerified) {

                        gameData.isVerified = true;

                        if (inputGameProperties.tgURL) {
                            gameData.tgURL = inputGameProperties.tgURL;
                        }

                        if (inputGameProperties.dkfURL) {
                            gameData.dkfURL = inputGameProperties.dkfURL;
                        }

                    }

                    if (inputGameProperties.event) {

                        gameData.event = inputGameProperties.event;
                        eventService.addGameIdToEvent(inputGameProperties.event, inputGameId).then(function() {

                            gameData.$save();
                            resolve();

                        });

                    } else {

                        gameData.$save();
                        resolve();

                    }

                    console.log(gameData);

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

                    $rootScope.$broadcast('gameAdded', { gameId: newGameReference.key() });

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

	        	});

        	});

        }

    }
})();