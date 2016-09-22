(function() {
    'use strict';

    angular
        .module('kongtrac.compare')
        .controller('ComparePlayersController', ComparePlayersController);

    /* @ngInject */
    function ComparePlayersController($q, $interval, $filter, $state, $stateParams, compareService, playerService, eventService, gameService) {

        var vm = this;

        // Public Variables
        vm.inputPlayerIds = $stateParams.playerIds.split('&');
        vm.onlyShowSameEvents = false;
        vm.pbChartConfiguration = {};
        vm.playersData = [];
        vm.$state = $state;

        // Public Functions
        vm.camelize = camelize;
        vm.getIdenticalEvents = getIdenticalEvents;

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

            vm.pbChartConfiguration = {

                options: {
                    chart: {
                        type: 'line',
                        zoomType: 'x',
                        animation: true
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

            // Get all input players.
            vm.playersData = [];
            var promises = [];

            vm.inputPlayerIds.forEach(function(playerId) {
                promises.push(playerService.getPlayerData(playerId));
            });

            $q.all(promises).then(function then(playersResponse) {

                vm.playersData = playersResponse;
                vm.playersData.forEach(function(player) {

                    player.gameTableData = [];

                    playerService.getPlayerGames(player.gameIds).then(function then(gamesResponse) {

                        player.gamesData = gamesResponse;

                        player.arcadeBest = playerService.getArcadeBest(player.gamesData);
                        player.mameBest = playerService.getMAMEBest(player.gamesData);
                        player.firstKSDate = playerService.getFirstKSDate(player.gamesData);
                        player.firstMillionDate = playerService.getFirstMillionDate(player.gamesData);
                        player.pbMap = playerService.buildPBMap(player.gamesData);

                        vm.pbChartConfiguration.series.push({
                            data: player.pbMap,
                            name: player.name.split(' ').pop() + ' (PB History)',
                            lineWidth: 3,
                            borderWidth: 0,
                            marker: {
                                enabled: true
                            }
                        });

                        player.gamesData.forEach(function(game) {

                            var newGameTableObject = {
                                date: game.date,
                                score: game.score,
                                platform: game.platform,
                                finalBoard: game.finalBoard,
                                id: game.$id
                            };

                            if (game.event) {

                                player.hasEvents = true;

                                eventService.getEventData(game.event).then(function then(response) {

                                    newGameTableObject.eventId = game.event;
                                    newGameTableObject.eventName = response.name;
                                    newGameTableObject.eventWinnings = response.winnings ? response.winnings[camelize(player.name)] : null;
                                    newGameTableObject.eventStartDate = response.startDate;
                                    newGameTableObject.eventEndDate = response.endDate;

                                    // Find this player's position in the specified event.
                                    var eventGames = [];
                                    var pushedEventData = false;
                                    response.games.forEach(function(gameId) {

                                        gameService.getGameData(gameId).then(function then(gameResponse) {

                                            eventGames.push({
                                                player: camelize(gameResponse.player),
                                                score: gameResponse.score
                                            });

                                            eventGames = $filter('orderBy')(eventGames, '-score');
                                            for (var i = 0; i < eventGames.length; i += 1) {

                                                if (eventGames[i].player === camelize(player.name)) {
                                                    newGameTableObject.eventPosition = i + 1;
                                                    newGameTableObject.eventPositionOf = eventGames.length;
                                                    break;
                                                }

                                            }

                                            if (!pushedEventData) {
                                                player.gameTableData.push(newGameTableObject);
                                                pushedEventData = true;
                                            }

                                        });

                                    });

                                });

                            } else {
                                player.gameTableData.push(newGameTableObject);
                            }

                        });

                    });

                });

                console.log(vm.playersData);

            });

        }

        function camelize(inputString) {

            if (inputString) {
                return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                }).replace(/\s+/g, '');
            }

        }

        function getIdenticalEvents() {

            var eventSameGameTableData = [];
            var playerCount = vm.playersData.length;

            // Construct a list of every event each input player participated in.
            var allEventsCompeted = [];
            vm.playersData.forEach(function(player) {

                player.gameTableData.forEach(function(game) {

                    if (game.eventName) {

                        // Is this event already tracked? If not, add it with a starting value of 1.
                        var foundEvent = false;
                        allEventsCompeted.forEach(function(event) {

                            if (event.name === game.eventName) {

                                event.count += 1;
                                foundEvent = true;

                            }

                        });

                        if (!foundEvent) {

                            allEventsCompeted.push({
                                name: game.eventName,
                                count: 1
                            });

                        }

                    }

                });

            });

            // If the event count equals the player count, every input player competed in the event.
            var sameEventsCompeted = [];
            allEventsCompeted.forEach(function(event) {

                if (event.count === playerCount) {
                    sameEventsCompeted.push(event);
                }

            });

            sameEventsCompeted.forEach(function(event) {

                vm.playersData.forEach(function(player) {

                    player.sameEventGames = [];
                    player.gameTableData.forEach(function(game) {

                        if (game.eventName && game.eventName === event.name) {
                            player.sameEventGames.push(game);
                        }

                    });

                });

            });

            console.log(vm.playersData);

        }

    }

})();