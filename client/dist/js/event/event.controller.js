(function() {
    'use strict';

    angular
        .module('kongtrac.event')
        .controller('EventController', EventController);

    /* @ngInject */
    function EventController($stateParams, eventService, gameService) {

        var vm = this;

        // Public Variables
        vm.eventData = {};
        vm.eventEditData = {};
        vm.histogramChartConfiguration = {};
        vm.inputEvent = $stateParams.eventId;
        vm.isEditing = false;

        // Public Functions
        vm.camelize = camelize;
        vm.handleEditCommit = handleEditCommit;

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

            eventService.getEventData(vm.inputEvent).then(function then(response) {

                vm.eventData = response;

                vm.eventEditData.name = response.name;
                vm.eventEditData.startDate = response.startDate;
                vm.eventEditData.endDate = response.endDate;
                vm.eventEditData.onlineOffline = response.onlineOffline;
                vm.eventEditData.format = String(response.format);

                console.log(vm.eventEditData);

                // [100k, 200k, 300k, 400k, 500k, 600k, 700k, 800k, 900k, 1m, 1.1m]
                var histogramData =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                
                // Get all the games associated with this event.
                vm.eventData.gamesData = [];
                vm.eventData.games.forEach(function(game) {

                    gameService.getGameData(game).then(function then(gameResponse) {

                        if (vm.eventData.winnings[camelize(gameResponse.player)]) {
                            gameResponse.winnings = vm.eventData.winnings[camelize(gameResponse.player)];
                        }

                        vm.eventData.gamesData.push(gameResponse);

                        if (gameResponse.score >= 100000 && gameResponse.score < 200000) {
                            histogramData[0] += 1;
                        } else if (gameResponse.score >= 200000 && gameResponse.score < 300000) {
                            histogramData[1] += 1;
                        } else if (gameResponse.score >= 300000 && gameResponse.score < 400000) {
                            histogramData[2] += 1;
                        } else if (gameResponse.score >= 400000 && gameResponse.score < 500000) {
                            histogramData[3] += 1;
                        } else if (gameResponse.score >= 500000 && gameResponse.score < 600000) {
                            histogramData[4] += 1;
                        } else if (gameResponse.score >= 600000 && gameResponse.score < 700000) {
                            histogramData[5] += 1;
                        } else if (gameResponse.score >= 700000 && gameResponse.score < 800000) {
                            histogramData[6] += 1;
                        } else if (gameResponse.score >= 800000 && gameResponse.score < 900000) {
                            histogramData[7] += 1;
                        } else if (gameResponse.score >= 900000 && gameResponse.score < 1000000) {
                            histogramData[8] += 1;
                        } else if (gameResponse.score >= 1000000 && gameResponse.score < 1100000) {
                            histogramData[9] += 1;
                        } else if (gameResponse.score >= 1100000) {
                            histogramData[10] += 1;
                        }

                    });

                });

                // Calculate the prize pool.
                vm.eventData.prizePool = 0;
                for (var key in vm.eventData.winnings) {
                    if (vm.eventData.winnings.hasOwnProperty(key)) {
                        vm.eventData.prizePool += vm.eventData.winnings[key];
                    }
                }

                vm.histogramChartConfiguration.series = [
                    {
                        data: histogramData,
                        name: (vm.eventData.name).match(/[A-Z0-9#]/g).join('') + ' (Histogram)',
                        color: '#000000',
                        lineWidth: 3,
                        borderWidth: 0,
                        marker: {
                            enabled: true
                        }
                    }
                ];

                console.log(vm.eventData);

            });

        }

        function camelize(inputString) {

            return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');

        }

        function handleEditCommit() {

            eventService.editEvent(vm.inputEvent, vm.eventEditData).then(function() {
                vm.isEditing = false;
            });

        }

    }
    EventController.$inject = ["$stateParams", "eventService", "gameService"];

})();