(function() {
    'use strict';

    CompareEventsController.$inject = ["$q", "$filter", "$state", "$stateParams", "compareService", "eventService", "gameService"];
    angular
        .module('kongtrac.compare')
        .controller('CompareEventsController', CompareEventsController);

    /* @ngInject */
    function CompareEventsController(
        $q,
        $filter,
        $state,
        $stateParams,
        compareService,
        eventService,
        gameService
    ) {
        var vm = this;

        // Public Variables
        vm.inputEventIds = $stateParams.eventIds.split('&');
        vm.histogramChartConfiguration = {};
        vm.$state = $state;

        // Public Functions
        vm.camelize = camelize;

        activate();

        ////////////////

        function activate() {
            vm.histogramChartConfiguration = {
                options: {
                    chart: {
                        type: 'column',
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Scores Histogram'
                    },
                    subtitle: {
                        text: 'Click and drag to zoom'
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
                xAxis: {
                    title: {
                        text: 'Ranges'
                    },
                    categories: [
                        '100k',
                        '200k',
                        '300k',
                        '400k',
                        '500k',
                        '600k',
                        '700k',
                        '800k',
                        '900k',
                        '1m',
                        '1.1m'
                    ],
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    },
                    allowDecimals: false
                },
                exporting: {
                    enabled: true
                }
            };

            // Get all input events.
            vm.eventsData = [];
            var promises = [];

            vm.inputEventIds.forEach(function(eventId) {
                promises.push(eventService.getEventData(eventId));
            });

            $q.all(promises).then(function then(eventsResponse) {
                vm.eventsData = eventsResponse;
                vm.eventsData.forEach(function(event) {
                    // [100k, 200k, 300k, 400k, 500k, 600k, 700k, 800k, 900k, 1m, 1.1m]
                    var histogramData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    // Geta lll the games associated with this event.
                    event.gamesData = [];

                    var gamesPromises = [];
                    event.games.forEach(function(game) {
                        gamesPromises.push(gameService.getGameData(game));
                    });

                    $q.all(gamesPromises).then(function then(gamesResponse) {
                        gamesResponse.forEach(function(game) {
                            if (event.winnings[camelize(game.player)]) {
                                game.winnings =
                                    event.winnings[camelize(game.player)];
                            }

                            event.gamesData.push(game);

                            if (game.score >= 100000 && game.score < 200000) {
                                histogramData[0] += 1;
                            } else if (
                                game.score >= 200000 &&
                                game.score < 300000
                            ) {
                                histogramData[1] += 1;
                            } else if (
                                game.score >= 300000 &&
                                game.score < 400000
                            ) {
                                histogramData[2] += 1;
                            } else if (
                                game.score >= 400000 &&
                                game.score < 500000
                            ) {
                                histogramData[3] += 1;
                            } else if (
                                game.score >= 500000 &&
                                game.score < 600000
                            ) {
                                histogramData[4] += 1;
                            } else if (
                                game.score >= 600000 &&
                                game.score < 700000
                            ) {
                                histogramData[5] += 1;
                            } else if (
                                game.score >= 700000 &&
                                game.score < 800000
                            ) {
                                histogramData[6] += 1;
                            } else if (
                                game.score >= 800000 &&
                                game.score < 900000
                            ) {
                                histogramData[7] += 1;
                            } else if (
                                game.score >= 900000 &&
                                game.score < 1000000
                            ) {
                                histogramData[8] += 1;
                            } else if (
                                game.score >= 1000000 &&
                                game.score < 1100000
                            ) {
                                histogramData[9] += 1;
                            } else if (game.score >= 1100000) {
                                histogramData[10] += 1;
                            }
                        });

                        event.prizePool = 0;
                        for (var key in event.winnings) {
                            if (event.winnings.hasOwnProperty(key)) {
                                event.prizePool += event.winnings[key];
                            }
                        }

                        vm.histogramChartConfiguration.series.push({
                            data: histogramData,
                            name:
                                event.name.match(/[A-Z0-9#]/g).join('') +
                                ' (Histogram)',
                            lineWidth: 3,
                            bodrerWidth: 0,
                            marker: {
                                enabled: true
                            }
                        });

                        console.log(vm.eventsData);
                    });
                });
            });
        }

        function camelize(inputString) {
            if (inputString) {
                return inputString
                    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                        return index == 0
                            ? letter.toLowerCase()
                            : letter.toUpperCase();
                    })
                    .replace(/\s+/g, '');
            }
        }
    }
})();
