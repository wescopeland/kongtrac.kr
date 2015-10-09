(function() {
    'use strict';

    angular
        .module('kongtrac.game')
        .service('gameService', gameService);

    /* @ngInject */
    function gameService($q, $firebaseArray, $firebaseObject, boardMapper) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
    	var _game = {};
    	var _levelScores = {};

    	// Public Functions
    	this.getBoardWeights = getBoardWeights;
        this.getGameData = getGameData;
        this.processBoardScores = processBoardScores;

        // Private Functions
        // -- buildScoreMap(inputBoardScores, inputDeathsArray, inputStartScore);
        // -- buildPaceMap(inputBoardScores, inputDeathsArray, inputStartScore);
        // -- calculateAverageLife(inputDeathsArray);
        // -- calculateDeathPoints(inputDeathsArray);
        // -- calculateLongestLife(inputDeathsArray);
        // -- findMaxBarrel(inputBoardScores);
        // -- findMinBarrel(inputBoardScores);
        // -- findMinLevel(inputLevelScores);
        // -- findMaxLevel(inputLevelScores);
        // -- findMaxPie(inputBoardScores);
        // -- findMinPie(inputBoardScores);
        // -- findMaxSpring(inputBoardScores);
        // -- findMinSpring(inputBoardScores);
        // -- findMaxRivet(inputBoardScores);
        // -- findMinRivet(inputBoardScores);
        // -- getAverageBarrelFromBoardScores(inputBoardScores);
        // -- getAverageLevelFromLevelScores(inputLevelScores);
        // -- getAveragePieFromBoardScores(inputBoardScores);
        // -- getAverageSpringFromBoardScores(inputBoardScores);
        // -- getAverageRivetFromBoardScores(inputBoardScores);
        // -- getFinalBoard(inputGame);
        // -- getIndividualLevelScoresFromBoardScores(inputBoardScores);
        // -- getMaxPace(inputPaceMap);
        // -- getMinPace(inputPaceMap);
        // -- getStartScoreFromLevelScores(inputLevelScores);

        ////////////////

        function buildScoreMap(inputBoardScores, inputDeathsArray, inputStartScore) {

        	// To reduce typing.
        	var b = inputBoardScores;

        	var currentScore = 0;
        	var currentDeathPoints = 0;
        	var currentDeathCount = 0;

        	var scoreMap = [];

        	for (var i = 0; i < 117; i += 1) {

        		// Is this a death? If so, inflate the score sum.
				while (inputDeathsArray[currentDeathCount] && inputDeathsArray[currentDeathCount].board === i) {

					currentScore += inputDeathsArray[currentDeathCount].points;
					currentDeathCount += 1;

				}

				// Have we died four times? If so, end the mapping.
				if (currentDeathCount === 4) {

					scoreMap.push(currentScore);
					break;

				}

				currentScore += b[i];
        		scoreMap.push(currentScore);

        	}

        	return scoreMap;

        }

        function buildPaceMap(inputBoardScores, inputDeathsArray, inputStartScore) {

        	// To reduce typing.
        	var b = inputBoardScores;

        	var currentBarrelSum = 0;
        	var currentPieSum = 0;
        	var currentSpringSum = 0;
        	var currentRivetSum = 0;

        	var currentBarrelAverage = 0;
        	var currentPieAverage = 0;
        	var currentSpringAverage = 0;
        	var currentRivetAverage = 0;

        	var currentBarrelCount = 0;
        	var currentPieCount = 0;
        	var currentSpringCount = 0;
        	var currentRivetCount = 0;

        	var currentDeathPoints = 0;
        	var currentDeathCount = 0;

        	var paceMap = [];

        	// Add all deaths before 6-1 to the currentDeathPoints value.
        	for (var i = 0; i < inputDeathsArray.length; i += 1) {

        		if (inputDeathsArray[i].board <= 19) {
        			currentDeathPoints += inputDeathsArray[i].points;
        			currentDeathCount += 1;
        		}

        	}

        	// Start calculating pace at 6-1. We need a full level before we have any idea of pace.
        	var initialPace = ((b[14] + b[15] + b[16] + b[17] + b[18] + b[19]) * 17) + inputStartScore + currentDeathPoints + 700;
        	paceMap.push(initialPace);

        	currentBarrelSum = b[14] + b[16] + b[18];
        	currentPieSum = b[15];
        	currentSpringSum = b[17];
        	currentRivetSum = b[19];

        	currentBarrelCount = 3;
        	currentPieCount = 1;
        	currentSpringCount = 1;
        	currentRivetCount = 1;

        	currentBarrelAverage = currentBarrelSum / currentBarrelCount;
        	currentPieAverage = currentPieSum;
        	currentSpringAverage = currentSpringSum;
        	currentRivetAverage = currentRivetSum;

        	var currentScreenInLevel = 1;
			for (var i = 20; i < inputBoardScores.length; i += 1) {

				// Have we died four times? If so, end the mapping.
				if (currentDeathCount === 4) {
					break;
				}

				// Is this a death? If so, inflate the pace.
				while (inputDeathsArray[currentDeathCount].board === i) {

					currentDeathPoints += inputDeathsArray[currentDeathCount].points;
					currentDeathCount += 1;

				}

				// Barrel board.
				if (currentScreenInLevel === 1 || currentScreenInLevel === 3 || currentScreenInLevel === 5) {

					currentBarrelSum += b[i];

					currentBarrelCount += 1;
					currentBarrelAverage = currentBarrelSum / currentBarrelCount;

					currentScreenInLevel += 1;

				}

				// Pie factory.
				else if (currentScreenInLevel === 2) {

					currentPieSum += b[i];

					currentPieCount += 1;
					currentPieAverage = currentPieSum / currentPieCount;

					currentScreenInLevel += 1;

				}

				// Spring board.
				else if (currentScreenInLevel === 4) {

					currentSpringSum += b[i];

					currentSpringCount += 1;
					currentSpringAverage = currentSpringSum / currentSpringCount;

					currentScreenInLevel += 1;

				}

				// Rivet board.
				else if (currentScreenInLevel === 6) {

					currentRivetSum += b[i];

					currentRivetCount += 1;
					currentRivetAverage = currentRivetSum / currentRivetCount;

					currentScreenInLevel = 1;

				}

				var unroundedCurrentPace = (( (currentBarrelAverage*3) + currentPieAverage + currentSpringAverage + currentRivetAverage) * 17) 
						+ inputStartScore 
						+ currentDeathPoints;

				if (i !== 116) {
					unroundedCurrentPace += 700;
				}

				var roundedCurrentPace = Math.round(unroundedCurrentPace / 100) * 100;

				paceMap.push(roundedCurrentPace);

        	}

        	return paceMap;

        }

        function calculateAverageLife(inputDeathsArray) {

        	var firstManBoardCount = inputDeathsArray[0].board;
        	var secondManBoardCount = inputDeathsArray[1].board - inputDeathsArray[0].board;
			var thirdManBoardCount = inputDeathsArray[2].board - inputDeathsArray[1].board;
        	var fourthManBoardCount = inputDeathsArray[3].board - inputDeathsArray[2].board;

        	return (firstManBoardCount + secondManBoardCount + thirdManBoardCount + fourthManBoardCount) / 4;

        }

        function calculateDeathPoints(inputDeathsArray) {

        	var deathPointsSum = 0;

        	inputDeathsArray.forEach(function(death) {
        		deathPointsSum += death.points;
        	});

        	return deathPointsSum;

        }

        function calculateLongestLife(inputDeathsArray) {

        	var firstManBoardCount = inputDeathsArray[0].board + 1;
        	var secondManBoardCount = (inputDeathsArray[1].board - inputDeathsArray[0].board) + 1;
			var thirdManBoardCount = (inputDeathsArray[2].board - inputDeathsArray[1].board) + 1;
        	var fourthManBoardCount = (inputDeathsArray[3].board - inputDeathsArray[2].board) + 1;

        	return Math.max(firstManBoardCount, secondManBoardCount, thirdManBoardCount, fourthManBoardCount);

        }

        function findMaxBarrel(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var barrelScores = [];

            // Begin at 5-1.
            for (var i = 14; i < 116; i += 1) {

                // Every other board is a barrel. If this isn't a barrel, go to next iteration.
                if (i % 2 === 0) {
                    barrelScores.push(b[i]);
                }

            }

            var maxBarrel = Math.max.apply(Math, barrelScores);

            return maxBarrel;

        }

        function findMinBarrel(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var barrelScores = [];

            // Begin at 5-1.
            for (var i = 14; i < 116; i += 1) {

                // Every other board is a barrel. If this isn't a barrel, go to next iteration.
                if (i % 2 === 0) {
                    barrelScores.push(b[i]);
                }

            }

            var minBarrel = Math.min.apply(Math, barrelScores);

            return minBarrel;

        }

        function findMaxLevel(inputLevelScores) {

            var levelScoresArray = [];
            var currentLevel = 1;

            for (var key in inputLevelScores) {

                if (inputLevelScores.hasOwnProperty(key)) {

                    if (currentLevel >= 5) {
                        levelScoresArray.push(inputLevelScores[key]);
                    }
                    
                    currentLevel += 1;

                }

            }

            var maxLevel = Math.max.apply(Math, levelScoresArray);

            return maxLevel;

        }

        function findMinLevel(inputLevelScores) {

            var levelScoresArray = [];
            var currentLevel = 1;

            for (var key in inputLevelScores) {

                if (inputLevelScores.hasOwnProperty(key)) {

                    if (currentLevel >= 5) {
                        levelScoresArray.push(inputLevelScores[key]);
                    }
                    
                    currentLevel += 1;

                }

            }

            var minLevel = Math.min.apply(Math, levelScoresArray);

            return minLevel;

        }

        function findMaxPie(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var pieScores = [];

            // Begin at 5-1.
            for (var i = 15; i < 116; i += 6) {
                pieScores.push(b[i]);
            }

            var maxPie = Math.max.apply(Math, pieScores);

            return maxPie;

        }

        function findMinPie(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var pieScores = [];

            // Begin at 5-1.
            for (var i = 15; i < 116; i += 6) {
                pieScores.push(b[i]);
            }

            var minPie = Math.min.apply(Math, pieScores);

            return minPie;

        }

        function findMaxSpring(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var springScores = [];

            // Begin at 5-1.
            for (var i = 17; i < 116; i += 6) {
                springScores.push(b[i]);
            }

            var maxSpring = Math.max.apply(Math, springScores);

            return maxSpring;

        }

        function findMinSpring(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var springScores = [];

            // Begin at 5-1.
            for (var i = 17; i < 116; i += 6) {
                springScores.push(b[i]);
            }

            var minSpring = Math.min.apply(Math, springScores);

            return minSpring;

        }

        function findMaxRivet(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var rivetScores = [];

            // Begin at 5-1.
            for (var i = 19; i < 116; i += 6) {
                rivetScores.push(b[i]);
            }

            var maxRivet = Math.max.apply(Math, rivetScores);

            return maxRivet;

        }

        function findMinRivet(inputBoardScores) {

            // For easier typing.
            var b = inputBoardScores;

            var rivetScores = [];

            // Begin at 5-1.
            for (var i = 19; i < 116; i += 6) {
                rivetScores.push(b[i]);
            }

            var minRivet = Math.min.apply(Math, rivetScores);

            return minRivet;

        }

        function getAverageBarrelFromBoardScores(inputBoardScores) {

        	// To save redundancy and typing.
        	var b = inputBoardScores;

        	var barrelBoardSum = 0;
        	var barrelBoardCount = 0;

        	// FIXME: What if it doesn't make it past the start?
        	for (var i = 14; i < b.length; i += 1) {

        		// Every other board is a barrel board.
        		if (i !== 116 && i % 2 === 0) {

        			barrelBoardSum += b[i];
        			barrelBoardCount += 1;

        		}

        	}

        	var unroundedBarrelAverage = (barrelBoardSum / barrelBoardCount);
        	var roundedBarrelAverage = Math.round(unroundedBarrelAverage / 100) * 100;
        	return roundedBarrelAverage;

        }

        function getAverageLevelFromLevelScores(inputLevelScores) {

        	var levelScoresArray = $.map(inputLevelScores, function(value, index) {
        		return value;
        	});

        	var levelSum = 0;
        	var levelCount = 0;

        	// Begin at L5 and end at L21 or the duration of the game.
        	for (var i = 4; (i < 22 && i < levelScoresArray.length); i += 1) {

        		levelSum += levelScoresArray[i];
        		levelCount += 1;

        	}

        	var unroundedLevelAverage = (levelSum / levelCount);
        	var roundedLevelAverage = Math.round(unroundedLevelAverage / 100) * 100;
        	return roundedLevelAverage;

        }

        function getAveragePieFromBoardScores(inputBoardScores) {

        	// To save redundancy and typing.
        	var b = inputBoardScores;

        	var pieBoardSum = 0;
        	var pieBoardCount = 0;

        	// FIXME: What if it doesn't make it past the start?
        	for (var i = 15; i < b.length; i += 6) {

        		if (i < 116) {

        			pieBoardSum += b[i];
        			pieBoardCount += 1;

        		}

        	}

        	var unroundedPieAverage = (pieBoardSum / pieBoardCount);
        	var roundedPieAverage = Math.round(unroundedPieAverage / 100) * 100;
        	return roundedPieAverage;

        }

        function getAverageSpringFromBoardScores(inputBoardScores) {

        	// To save redundancy and typing.
        	var b = inputBoardScores;

        	var springBoardSum = 0;
        	var springBoardCount = 0;

        	// FIXME: What if it doesn't make it past the start?
        	for (var i = 17; i < b.length; i += 6) {

        		if (i < 116) {

        			springBoardSum += b[i];
        			springBoardCount += 1;

        		}

        	}

        	var unroundedSpringAverage = (springBoardSum / springBoardCount);
        	var roundedSpringAverage = Math.round(unroundedSpringAverage / 100) * 100;
        	return roundedSpringAverage;

        }

        function getAverageRivetFromBoardScores(inputBoardScores) {

        	// To save redundancy and typing.
        	var b = inputBoardScores;

        	var rivetBoardSum = 0;
        	var rivetBoardCount = 0;

        	// FIXME: What if it doesn't make it past the start?
        	for (var i = 19; i < b.length; i += 6) {

        		if (i < 116) {

        			rivetBoardSum += b[i];
        			rivetBoardCount += 1;

        		}

        	}

        	var unroundedRivetAverage = (rivetBoardSum / rivetBoardCount);
        	var roundedRivetAverage = Math.round(unroundedRivetAverage / 100) * 100;
        	return roundedRivetAverage;

        }

        function getBoardWeights() {

        	var weightData = $firebaseObject(
        		_fbRef
        			.child('settings')
        			.child('weights')
        	);

        	return $q(function(resolve, reject) {

        		weightData.$loaded().then(function() {
        			resolve(weightData);
        		});

        	});

        }

        function getFinalBoard(inputGame) {

            if ( _game.isKillscreen || (_game.deaths && _game.deaths[3].board === 116) ) {
                return '22-1';
            }

            if (!_game.hasCompleteData) {
                return 'Unknown';
            }

            return boardMapper.mapBoardNumberToLevel(_game.boardScores.length);

        }

        function getIndividualLevelScoresFromBoardScores(inputBoardScores) {

        	// To save redundancy and typing.
        	var b = inputBoardScores;

        	var levelScores = {};

            for (var i = 0; i < inputBoardScores.length; i++) {

                if (i === 0 || i === 1) {
                    if (!levelScores.L1) { levelScores.L1 = b[i]; }
                    levelScores.L1 += b[i];
                }

                if (i === 2 || i === 3 || i === 4) {
                    if (!levelScores.L2) { levelScores.L2 = b[i]; }
                    levelScores.L2 += b[i];
                }

                if (i === 5 || i === 6 || i === 7 || i === 8) {
                    if (!levelScores.L3) { levelScores.L3 = b[i]; }
                    levelScores.L3 += b[i];
                }

                if (i === 9 || i === 10 || i === 11 || i === 12 || i === 13) {
                    if (!levelScores.L4) { levelScores.L4 = b[i]; }
                    levelScores.L4 += b[i];
                }

                if (i === 14 || i === 15 || i === 16 || i === 17 || i === 18 || i === 19) {
                    if (!levelScores.L5) { levelScores.L5 = b[i]; }
                    levelScores.L5 += b[i];
                }

                if (i === 20 || i === 21 || i === 22 || i === 23 || i === 24 || i === 25) {
                    if (!levelScores.L6) { levelScores.L6 = b[i]; }
                    levelScores.L6 += b[i];
                }

                if (i === 26 || i === 27 || i === 28 || i === 29 || i === 30 || i === 31) {
                    if (!levelScores.L7) { levelScores.L7 = b[i]; }
                    levelScores.L7 += b[i];
                }

                if (i === 32 || i === 33 || i === 34 || i === 35 || i === 36 || i === 37) {
                    if (!levelScores.L8) { levelScores.L8 = b[i]; }
                    levelScores.L8 += b[i];
                }

                if (i === 38 || i === 39 || i === 40 || i === 41 || i === 42 || i === 43) {
                    if (!levelScores.L9) { levelScores.L9 = b[i]; }
                    levelScores.L9 += b[i];
                }

                if (i === 44 || i === 45 || i === 46 || i === 47 || i === 48 || i === 49) {
                    if (!levelScores.L10) { levelScores.L10 = b[i]; }
                    levelScores.L10 += b[i];
                }

                if (i === 50 || i === 51 || i === 52 || i === 53 || i === 54 || i === 55) {
                    if (!levelScores.L11) { levelScores.L11 = b[i]; }
                    levelScores.L11 += b[i];
                }

                if (i === 56 || i === 57 || i === 58 || i === 59 || i === 60 || i === 61) {
                    if (!levelScores.L12) { levelScores.L12 = b[i]; }
                    levelScores.L12 += b[i];
                }

                if (i === 62 || i === 63 || i === 64 || i === 65 || i === 66 || i === 67) {
                    if (!levelScores.L13) { levelScores.L13 = b[i]; }
                    levelScores.L13 += b[i];
                }

                if (i === 68 || i === 69 || i === 70 || i === 71 || i === 72 || i === 73) {
                    if (!levelScores.L14) { levelScores.L14 = b[i]; }
                    levelScores.L14 += b[i];
                }

                if (i === 74 || i === 75 || i === 76 || i === 77 || i === 78 || i === 79) {
                    if (!levelScores.L15) { levelScores.L15 = b[i]; }
                    levelScores.L15 += b[i];
                }

                if (i === 80 || i === 81 || i === 82 || i === 83 || i === 84 || i === 85) {
                    if (!levelScores.L16) { levelScores.L16 = b[i]; }
                    levelScores.L16 += b[i];
                }

                if (i === 86 || i === 87 || i === 88 || i === 89 || i === 90 || i === 91) {
                    if (!levelScores.L17) { levelScores.L17 = b[i]; }
                    levelScores.L17 += b[i];
                }

                if (i === 92 || i === 93 || i === 94 || i === 95 || i === 96 || i === 97) {
                    if (!levelScores.L18) { levelScores.L18 = b[i]; }
                    levelScores.L18 += b[i];
                }

                if (i === 98 || i === 99 || i === 100 || i === 101 || i === 102 || i === 103) {
                    if (!levelScores.L19) { levelScores.L19 = b[i]; }
                    levelScores.L19 += b[i];
                }

                if (i === 104 || i === 105 || i === 106 || i === 107 || i === 108 || i === 109) {
                    if (!levelScores.L20) { levelScores.L20 = b[i]; }
                    levelScores.L20 += b[i];
                }

                if (i === 110 || i === 111 || i === 112 || i === 113 || i === 114 || i === 115) {
                    if (!levelScores.L21) { levelScores.L21 = b[i]; }
                    levelScores.L21 += b[i];
                }

            }

        	return levelScores;

        }

        function getGameData(inputGameId) {

        	var gameData = $firebaseObject(
        		_fbRef
        			.child('games')
        			.child(inputGameId)
        	);

        	return $q(function(resolve, reject) {

        		gameData.$loaded().then(function() {
        			
        			_game = gameData;

                    if (_game.boardScores) {

                        processBoardScores(_game.boardScores);
                        _game.deathPoints = calculateDeathPoints(_game.deaths);
                        _game.longestLifeBoardCount = calculateLongestLife(_game.deaths);
                        _game.averageLifeBoardCount = calculateAverageLife(_game.deaths);
                        
                        _game.paceMap = buildPaceMap(_game.boardScores, _game.deaths, _game.startScore);
                        _game.scoreMap = buildScoreMap(_game.boardScores, _game.deaths, _game.startScore);
                        _game.maxPace = getMaxPace(_game.paceMap);
                        _game.minPace = getMinPace(_game.paceMap);

                        _game.minBarrel = findMinBarrel(_game.boardScores);
                        _game.maxBarrel = findMaxBarrel(_game.boardScores);
                        _game.minPie = findMinPie(_game.boardScores);
                        _game.maxPie = findMaxPie(_game.boardScores);
                        _game.minSpring = findMinSpring(_game.boardScores);
                        _game.maxSpring = findMaxSpring(_game.boardScores);
                        _game.minRivet = findMinRivet(_game.boardScores);
                        _game.maxRivet = findMaxRivet(_game.boardScores);
                        _game.minLevel = findMinLevel(_game.levelScores);
                        _game.maxLevel = findMaxLevel(_game.levelScores);

                    }

                    _game.finalBoard = getFinalBoard(_game);

        			resolve(_game);

        		});

        	});

        }

        function getStartScoreFromLevelScores(inputLevelScores) {

        	return inputLevelScores.L1 + inputLevelScores.L2 + inputLevelScores.L3 + inputLevelScores.L4;

        }

        function getMaxPace(inputPaceMap) {

        	var maxPaceObject = {};

        	maxPaceObject.pace = Math.max.apply(Math, inputPaceMap);
        	maxPaceObject.boardNumber = inputPaceMap.indexOf(maxPaceObject.pace) + 19;

        	return maxPaceObject;

        }

        function getMinPace(inputPaceMap) {

        	var minPaceObject = {};

        	minPaceObject.pace = Math.min.apply(Math, inputPaceMap);
        	minPaceObject.boardNumber = inputPaceMap.indexOf(minPaceObject.pace) + 19;

        	return minPaceObject;

        }

        function processBoardScores(inputBoardScores) {

        	// We need: every level score, total sum, start score, average barrel/pie/spring/rivet.
        	_levelScores = getIndividualLevelScoresFromBoardScores(inputBoardScores);
        	
            _game.levelScores = _levelScores;
        	_game.startScore = getStartScoreFromLevelScores(_levelScores);
        	_game.barrelAverage = getAverageBarrelFromBoardScores(inputBoardScores);
        	_game.pieAverage = getAveragePieFromBoardScores(inputBoardScores);
        	_game.springAverage = getAverageSpringFromBoardScores(inputBoardScores);
        	_game.rivetAverage = getAverageRivetFromBoardScores(inputBoardScores);
        	_game.levelAverage = getAverageLevelFromLevelScores(_levelScores);

        }

    }
})();