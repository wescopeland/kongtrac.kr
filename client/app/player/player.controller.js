(function() {
    'use strict';

    angular
        .module('kongtrac.player')
        .controller('PlayerController', PlayerController);

    /* @ngInject */
    function PlayerController($interval, $stateParams, $filter, playerService, gameService) {

        var vm = this;

        // Public Variables
        vm.inputPlayer = $stateParams.playerName;
        vm.onlyShowComplete = false;
        vm.pbChartConfiguration = {};
        vm.playerData = {};
        vm.playerGameTableData = [];

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

            vm.displayedPlayerGameTable = [].concat(vm.playerGameTableData);

            vm.pbChartConfiguration = {

        		options: {
        			chart: {
        				type: 'line',
                        zoomType: 'x'
        			},
        			title: {
        				text: 'Personal best history' 
        			},
                    tooltip: {
                        formatter: function() {
                            return '<b>' + $filter('amDateFormat')(this.x, 'MM/DD/YYYY') + '</b>: ' + $filter('number')(this.y);
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
        				text: 'Date'
        			},
        			type: 'datetime',
        			labels: {
        				formatter: function() {
        					return Highcharts.dateFormat('%b \'%y', this.value);
        				}
        			},
        			plotLines: []
        		},
        		yAxis: {
        			title: {
        				text: 'Score'
        			},
        			labels: {
        				formatter: abbreviateNumber
        			}
        		},
        		plotOptions: {
        			marker: {
        				enabled: true,
        				symbol: 'circle'
        			}
        		},
        		exporting: {
        			enabled: true
        		}

        	};

        	playerService.getPlayerData(vm.inputPlayer).then(function then(response) {

        		vm.playerData = response;

        		vm.playerData.gamesData = [];

        		vm.playerData.gameIds.forEach(function(gameId) {

        			gameService.getGameData(gameId).then(function then(gameResponse) {
        				vm.playerData.gamesData.push(gameResponse);
        			});

        		});

        		var processPlayerInterval = $interval(function() {

        			vm.playerData.arcadeBest = playerService.getArcadeBest(vm.playerData.gamesData);
        			vm.playerData.mameBest = playerService.getMAMEBest(vm.playerData.gamesData);
        			vm.playerData.firstKSDate = playerService.getFirstKSDate(vm.playerData.gamesData);
        			vm.playerData.firstMillionDate = playerService.getFirstMillionDate(vm.playerData.gamesData);
        			vm.playerData.pbMap = playerService.buildPBMap(vm.playerData.gamesData);

        			vm.pbChartConfiguration.series.push({
        				data: vm.playerData.pbMap,
        				name: vm.playerData.name.split(' ').pop() + ' (PB History)',
        				color: '#000000',
        				lineWidth: 3,
        				borderWidth: 0,
        				marker: {
        					enabled: true
        				}
        			});

        			console.log(vm.playerData);

                    vm.playerData.gamesData.forEach(function(game) {

                        var newGameTableObject = {
                            date: game.date,
                            score: game.score,
                            platform: game.platform,
                            finalBoard: game.finalBoard,
                            id: game.$id
                        }

                        vm.playerGameTableData.push(newGameTableObject);

                    });

                    if (vm.playerData.pbMap.length > 0) {
        				$interval.cancel(processPlayerInterval);
        			}

        		}, 300);

        	});

        }

    }

})();
