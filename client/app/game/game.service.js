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

        	console.log(scoreMap);
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

        function getIndividualLevelScoresFromBoardScores(inputBoardScores) {

        	// To save redundancy and typing.
        	var b = inputBoardScores;

        	var levelScores = {};

        	if (b[0] && b[1]) { levelScores.L1 = b[0] + b[1]; }
        	if (b[2] && b[3] && b[4]) { levelScores.L2 = b[2] + b[3] + b[4]; }
        	if (b[5] && b[6] && b[7] && b[8]) { levelScores.L3 = b[5] + b[6] + b[7] + b[8]; }
        	if (b[9] && b[10] && b[11] && b[12] && b[13]) { levelScores.L4 = b[9] + b[10] + b[11] + b[12] + b[13]; }
        	if (b[14] && b[15] && b[16] && b[17] && b[18] && b[19]) { levelScores.L5 = b[14] + b[15] + b[16] + b[17] + b[18] + b[19]; }
        	if (b[20] && b[21] && b[22] && b[23] && b[24] && b[25]) { levelScores.L6 = b[20] + b[21] + b[22] + b[23] + b[24] + b[25]; }
        	if (b[26] && b[27] && b[28] && b[29] && b[30] && b[31]) { levelScores.L7 = b[26] + b[27] + b[28] + b[29] + b[30] + b[31]; }
        	if (b[32] && b[33] && b[34] && b[35] && b[36] && b[37]) { levelScores.L8 = b[32] + b[33] + b[34] + b[35] + b[36] + b[37]; }
        	if (b[38] && b[39] && b[40] && b[41] && b[42] && b[43]) { levelScores.L9 = b[38] + b[39] + b[40] + b[41] + b[42] + b[43]; }
        	if (b[44] && b[45] && b[46] && b[47] && b[48] && b[49]) { levelScores.L10 = b[44] + b[45] + b[46] + b[47] + b[48] + b[49]; }
        	if (b[50] && b[51] && b[52] && b[53] && b[54] && b[55]) { levelScores.L11 = b[50] + b[51] + b[52] + b[53] + b[54] + b[55]; }
        	if (b[56] && b[57] && b[58] && b[59] && b[60] && b[61]) { levelScores.L12 = b[56] + b[57] + b[58] + b[59] + b[60] + b[61]; }
        	if (b[62] && b[63] && b[64] && b[65] && b[66] && b[67]) { levelScores.L13 = b[62] + b[63] + b[64] + b[65] + b[66] + b[67]; }
        	if (b[68] && b[69] && b[70] && b[71] && b[72] && b[73]) { levelScores.L14 = b[68] + b[69] + b[70] + b[71] + b[72] + b[73]; }
        	if (b[74] && b[75] && b[76] && b[77] && b[78] && b[79]) { levelScores.L15 = b[74] + b[75] + b[76] + b[77] + b[78] + b[79]; }
        	if (b[80] && b[81] && b[82] && b[83] && b[84] && b[85]) { levelScores.L16 = b[80] + b[81] + b[82] + b[83] + b[84] + b[85]; }
        	if (b[86] && b[87] && b[88] && b[89] && b[90] && b[91]) { levelScores.L17 = b[86] + b[87] + b[88] + b[89] + b[90] + b[91]; }
        	if (b[92] && b[93] && b[94] && b[95] && b[96] && b[97]) { levelScores.L18 = b[92] + b[93] + b[94] + b[95] + b[96] + b[97]; }
        	if (b[98] && b[99] && b[100] && b[101] && b[102] && b[103]) { levelScores.L19 = b[98] + b[99] + b[100] + b[101] + b[102] + b[103]; }
        	if (b[104] && b[105] && b[106] && b[107] && b[108] && b[109]) { levelScores.L20 = b[104] + b[105] + b[106] + b[107] + b[108] + b[109]; }
        	if (b[110] && b[111] && b[112] && b[113] && b[114] && b[115]) { levelScores.L21 = b[110] + b[111] + b[112] + b[113] + b[114] + b[115]; }
        	if (b[116]) { levelScores.KS = b[116]; }

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