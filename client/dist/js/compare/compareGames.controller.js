(function() {
    'use strict';

    angular
        .module('kongtrac.compare')
        .controller('CompareGamesController', CompareGamesController);

    /* @ngInject */
    function CompareGamesController($stateParams, $state, $filter, compareService, gameService, boardMapper) {

        var vm = this;

        // Public Variables
        vm.inputGameIds = $stateParams.gameIds.split('&');
        vm.paceChartConfiguration = {};
        vm.scoreChartConfiguration = {};
        vm.weights = {};
        vm.$state = $state;
        vm.inputLevelSlider = 0;

        // Public Functions
        vm.calculateAverageBarPercentage = calculateAverageBarPercentage;
        vm.camelize = camelize;
        vm.formatSlider = formatSlider;
        vm.getMappedBoardNumber = getMappedBoardNumber;

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
                        zoomType: 'x',
                        animation: true
                    },
                    title: {
                        text: ' '
                    },
                    tooltip: {
                        formatter: function() {

                            var tooltipTemplate = '';

                            var sortedPoints = $filter('orderBy')(this.points, '-y');
                            sortedPoints.forEach(function(point) {

                                tooltipTemplate += '<b>' + '(' + point.series.name.split(' ')[0] + ') ' 
                                    + getPaceChartMappedBoardNumber(point.x) + '</b>: ' 
                                    + $filter('number')(point.y) + '<br>';

                            });

                            return tooltipTemplate;

                        },
                        shared: true,
                        crosshairs: true
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
                        text: ' '
                    },
                    tooltip: {
                        formatter: function() {

                            var tooltipTemplate = '';

                            var sortedPoints = $filter('orderBy')(this.points, '-y');
                            sortedPoints.forEach(function(point) {

                                tooltipTemplate += '<b>' + '(' + point.series.name.split(' ')[0] + ') ' 
                                    + getScoreChartMappedBoardNumber(point.x) + '</b>: ' 
                                    + $filter('number')(point.y) + '<br>';

                            });

                            return tooltipTemplate;

                        },
                        shared: true,
                        crosshairs: true
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

            // Get the board weights.
            gameService.getBoardWeights().then(function then(response) {
                vm.weights = response;
            });

            // Get all input games.
            vm.gamesData = [];
            vm.inputGameIds.forEach(function(gameId, index) {

                gameService.getGameData(gameId).then(function then(response) {

                    var gameData = response;
                    console.log(response);

                    vm.inputLevelSlider = response.mappableLevels.length + 4;

                    vm.paceChartConfiguration.series.push({
                        data: gameData.paceMap,
                        name: gameData.player.split(' ').pop() + ' (Pace) ' + $filter('number')(gameData.score),
                        lineWidth: 3,
                        borderWidth: 0,
                        marker: {
                            enabled: false
                        }
                    });

                    vm.scoreChartConfiguration.series.push({
                        data: gameData.scoreMap,
                        name: gameData.player.split(' ').pop() + ' (Score) ' + $filter('number')(gameData.score),
                        lineWidth: 3,
                        borderWidth: 0,
                        marker: {
                            enabled: false
                        }
                    });

                    vm.paceChartConfiguration.options.title.text += gameData.player;
                    vm.scoreChartConfiguration.options.title.text += gameData.player;
                    if (index !== vm.inputGameIds.length - 1) {
                        vm.paceChartConfiguration.options.title.text += ' v. ';
                        vm.scoreChartConfiguration.options.title.text += ' v. ';
                    } else {
                        vm.paceChartConfiguration.options.title.text += ' (Pace History)';
                        vm.scoreChartConfiguration.options.title.text += ' (Score History)';
                    }

                    if (response.deaths) {

                        response.deaths.forEach(function(death) {

                            var newPacePlotLine = {
                                value: death.board - 19,
                                width: 1
                            };

                            var newScorePlotLine = {
                                value: death.board,
                                width: 1
                            };

                        })

                    }

                    vm.gamesData.push(gameData);

                });

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

        function formatSlider(value) {
            return 'L' + value;
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

    }
    CompareGamesController.$inject = ["$stateParams", "$state", "$filter", "compareService", "gameService", "boardMapper"];

})();