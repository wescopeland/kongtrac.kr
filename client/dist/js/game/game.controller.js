(function() {
    'use strict';

    angular
        .module('kongtrac.game')
        .controller('GameController', GameController);

    /* @ngInject */
    function GameController($stateParams, $state, $filter, $timeout, gameService, searchService, eventService, submitGameService, boardMapper, highchartsNG) {

        var vm = this;

        // Public Variables
        vm.$state = $state;
        vm.gameData = {};
        vm.gameEditData = {};
        vm.gameId = $stateParams.gameId;
        vm.inputLevelSlider = 0;
        vm.paceChartConfiguration = {};
        vm.scoreChartConfiguration = {};
        vm.weights = {};

        // Public Functions
        vm.calculateAverageBarPercentage = calculateAverageBarPercentage;
        vm.camelize = camelize;
        vm.chooseEvent = chooseEvent;
        vm.eventSearch = eventSearch;
        vm.expand = expand;
        vm.formatSlider = formatSlider;
        vm.getAllLevels = getAllLevels;
        vm.getMappedBoardNumber = getMappedBoardNumber;
        vm.handleEditCommit = handleEditCommit;

        // Private Functions
        // -- abbreviateNumber();
        // -- getScoreChartMappedBoardNumber();
        // -- getPaceChartMappedBoardNumber();

        activate();

        ////////////////

        function abbreviateNumber() {
		    
        	var number = this.value;
        	var decPlaces = 2;

        	number = Number(number);

		    // 2 decimal places => 100, 3 => 1000, etc
		    decPlaces = Math.pow(10,decPlaces);

		    // Enumerate number abbreviations
		    var abbrev = [ "k", "m", "b", "t" ];

		    // Go through the array backwards, so we do the largest first
		    for (var i=abbrev.length-1; i>=0; i--) {

		        // Convert array index to "1000", "1000000", etc
		        var size = Math.pow(10,(i+1)*3);

		        // If the number is bigger or equal do the abbreviation
		        if(size <= number) {
		             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
		             // This gives us nice rounding to a particular decimal place.
		             number = Math.round(number*decPlaces/size)/decPlaces;

		             // Handle special case where we round up to the next abbreviation
		             if((number == 1000) && (i < abbrev.length - 1)) {
		                 number = 1;
		                 i++;
		             }

		             // Add the letter for the abbreviation
		             number += abbrev[i];

		             // We are done... stop
		             break;
		        }
		    }

		    return number;
		}

        function activate() {

        	vm.paceChartConfiguration = {

        		options: {
        			chart: {
        				type: 'line',
                        zoomType: 'x'
        			},
        			title: {
        				text: 'Pace history for this game'
        			},
                    tooltip: {
                        formatter: function() {
                            return '<b>' + getPaceChartMappedBoardNumber(this.x) + '</b>: ' + $filter('number')(this.y);
                        }
                    },
                    exporting: {
                        enabled: true,
                        sourceWidth: 1300,
                        sourceHeight: 600,
                        scale: 1,
                        chartOptions: {
                            subtitle: null
                        }
                    }
        		},
        		series: [],
    			credits: {
    				enabled: false
    			},
                subtitle: {
    				text: 'Click and drag to zoom'
    			},
    			xAxis: {
    				title: {
    					text: 'Level'
    				},
    				labels: {
    					formatter: getPaceChartMappedBoardNumber
    				},
                    plotLines: [],
                    tickPositions: [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 115]
    			},
    			yAxis: {
    				title: {
    					text: 'Pace'
    				},
    				labels: {
    					formatter: abbreviateNumber
    				}
    			},
    			plotOptions: {
    				marker: {
    					enabled: false,
    					symbol: 'circle'
    				}
    			}

        	};

            vm.scoreChartConfiguration = {

                options: {
                    chart: {
                        type: 'line',
                        zoomType: 'x',
                        animation: true
                    },
                    title: {
                        text: 'Score history for this game'
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>' + getScoreChartMappedBoardNumber(this.x) + '</b>: ' + $filter('number')(this.y);
                        }
                    },
                    exporting: {
                        enabled: true,
                        sourceWidth: 1300,
                        sourceHeight: 600,
                        scale: 1,
                        chartOptions: {
                            subtitle: null
                        }
                    }
                },
                series: [],
                credits: {
                    enabled: false
                },
                subtitle: {
                    text: 'Click and drag to zoom'
                },
                xAxis: {
                    title: {
                        text: 'Level'
                    },
                    labels: {
                        formatter: getScoreChartMappedBoardNumber
                    },
                    plotLines: [],
                    tickPositions: [8, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 97, 103, 109, 115]
                },
                yAxis: {
                    title: {
                        text: 'Score'
                    },
                    labels: {
                        formatter: abbreviateNumber
                    },
                    min: 0
                },
                plotOptions: {
                    marker: {
                        enabled: false,
                        symbol: 'circle'
                    }
                },
                exporting: {
                    enabled: true,
                    sourceWidth: 1400,
                    width: 1400,
                    sourceHeight: 100,
                    scale: 1,
                    chartOptions: {
                        subtitle: null
                    }
                }

            };

            gameService.getBoardWeights().then(function then(response) {
        		vm.weights = response;
        	});

        	gameService.getGameData($stateParams.gameId).then(function then(response) {

        		vm.gameData = response;
                console.log(vm.gameData);

                vm.gameEditData.date = vm.gameData.date;
                vm.gameEditData.score = vm.gameData.score;
                vm.gameEditData.player = vm.gameData.player;
                vm.gameEditData.platform = vm.gameData.platform;
                vm.gameEditData.isKillscreen = vm.gameData.isKillscreen ? vm.gameData.isKillscreen : false;
                vm.gameEditData.hasCompleteData = vm.gameData.hasCompleteData ? vm.gameData.hasCompleteData : false;

                if (vm.gameData.event) {

                    eventService.getEventData(vm.gameData.event).then(function then(response) {

                        vm.gameEditData.eventName = response.name;
                        vm.gameEditData.eventId = vm.gameData.event;

                    });

                }

                if (vm.gameData.hasCompleteData) {

                    vm.gameEditData.hasCompleteData = true;
                    vm.gameEditData.boardScores = vm.gameData.boardScores;
                    vm.gameEditData.deaths = angular.copy(vm.gameData.deaths);

                    vm.gameEditData.deaths[0].board = boardMapper.mapBoardNumberToLevel(vm.gameEditData.deaths[0].board);
                    vm.gameEditData.deaths[1].board = boardMapper.mapBoardNumberToLevel(vm.gameEditData.deaths[1].board);
                    vm.gameEditData.deaths[2].board = boardMapper.mapBoardNumberToLevel(vm.gameEditData.deaths[2].board);
                    vm.gameEditData.deaths[3].board = boardMapper.mapBoardNumberToLevel(vm.gameEditData.deaths[3].board);

                    vm.inputLevelSlider = vm.gameData.mappableLevels.length + 4;

                }

                vm.paceChartConfiguration.series.push({
        			data: vm.gameData.paceMap,
        			name: vm.gameData.player.split(' ').pop() + ' (Pace) ' + $filter('number')(vm.gameData.score),
    				color: '#000000',
    				lineWidth: 3,
    				borderWidth: 0,
    				marker: {
    					enabled: false
    				}
        		});

                if (response.deaths) {

                    response.deaths.forEach(function(death) {

                        var newPacePlotLine = {
                            color: '#C0D0E0',
                            value: death.board - 19,
                            width: 1
                        };

                        var newScorePlotLine = {
                            color: '#C0D0E0',
                            value: death.board,
                            width: 1
                        };

                        // Don't render the KS.
                        if (vm.paceChartConfiguration.xAxis.plotLines.indexOf(newPacePlotLine) === -1
                                && newPacePlotLine.value !== 97) {
                            vm.paceChartConfiguration.xAxis.plotLines.push(newPacePlotLine);
                        }

                        if (vm.scoreChartConfiguration.xAxis.plotLines.indexOf(newScorePlotLine) === -1
                                && newScorePlotLine.value !== 116) {
                            vm.scoreChartConfiguration.xAxis.plotLines.push(newScorePlotLine);
                        }

                    });

                    vm.scoreChartConfiguration.series.push({
                        data: vm.gameData.scoreMap,
                        name: vm.gameData.player.split(' ').pop() + ' (Score) ' + $filter('number')(vm.gameData.score),
                        color: '#000000',
                        lineWidth: 3,
                        borderWidth: 0,
                        marker: {
                            enabled: false
                        }
                    });

                }    

        	});

        }

        function calculateAverageBarPercentage(inputAverageMap, inputMin, inputMax) {

            var screenPeriodAverage = inputAverageMap[vm.inputLevelSlider - 5];
            var percentage = (screenPeriodAverage - inputMin) / (inputMax - inputMin) * 100;

            if (percentage > 100) {
                percentage = 100;
            } else if (percentage < 14) {
                percentage = 14;
            }

            return percentage + '%';

        }

        function camelize(inputString) {

            if (inputString) {
                return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                }).replace(/\s+/g, '');
            }

        }

        function chooseEvent(inputEvent) {

            vm.gameEditData.eventName = inputEvent.name;
            vm.gameEditData.eventId = inputEvent.objectID;

        }

        function eventSearch(inputQuery) {
            return searchService.eventSearch(inputQuery);
        }

        function expand(inputPoints) {
            return submitGameService.expandAbbreviatedPoints(inputPoints);
        }

        function formatSlider(value) {
            return 'L' + value;
        }

        function getAllLevels() {
            return boardMapper.getAllLevels();
        }

        function getScoreChartMappedBoardNumber(inputBoardNumber) {

            var boardNumber;

            if (this && this.value && !inputBoardNumber) {
                boardNumber = this.value;
            } else {
                boardNumber = inputBoardNumber;
            }

            return boardMapper.mapBoardNumberToLevel(boardNumber);

        }

        function getPaceChartMappedBoardNumber(inputBoardNumber) {

        	var boardNumber;

            if (this && this.value) {
                boardNumber = this.value + 19;
            } else {
                boardNumber = inputBoardNumber + 19;
            }

        	return boardMapper.mapBoardNumberToLevel(boardNumber);

        }

        function getMappedBoardNumber(inputBoardNumber) {
        	return boardMapper.mapBoardNumberToLevel(inputBoardNumber);
        }

        function handleEditCommit() {

            var gamePropertiesObject = {};

            gamePropertiesObject.player = vm.gameData.player;
            gamePropertiesObject.date = vm.gameEditData.date;
            gamePropertiesObject.score = Number(vm.gameEditData.score);
            gamePropertiesObject.platform = vm.gameEditData.platform;
            gamePropertiesObject.isKillscreen = vm.gameEditData.isKillscreen;
            gamePropertiesObject.hasCompleteData = vm.gameEditData.hasCompleteData;

            if (vm.gameEditData.eventId) {
                gamePropertiesObject.event = vm.gameEditData.eventId;
            }

            if (vm.gameEditData.hasCompleteData) {

                gamePropertiesObject.boardScores = vm.gameEditData.boardScores;

                vm.gameEditData.deaths[0].board = boardMapper.mapLevelToBoardNumber(vm.gameEditData.deaths[0].board);
                vm.gameEditData.deaths[1].board = boardMapper.mapLevelToBoardNumber(vm.gameEditData.deaths[1].board);
                vm.gameEditData.deaths[2].board = boardMapper.mapLevelToBoardNumber(vm.gameEditData.deaths[2].board);
                vm.gameEditData.deaths[3].board = boardMapper.mapLevelToBoardNumber(vm.gameEditData.deaths[3].board);

                console.log(vm.gameEditData.deaths);

                gamePropertiesObject.deaths = vm.gameEditData.deaths;

            }

            submitGameService.overwriteGame(gamePropertiesObject, $stateParams.gameId).then(function() {

                $timeout(function() {
                    $state.go('game.summary', {gameId: $stateParams.gameId});
                    activate();
                }, 100);

            });

        }

    }
    GameController.$inject = ["$stateParams", "$state", "$filter", "$timeout", "gameService", "searchService", "eventService", "submitGameService", "boardMapper", "highchartsNG"];
})();