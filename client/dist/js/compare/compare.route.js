(function() {
    'use strict';

    angular
        .module('kongtrac.compare')
        .config(compareConfiguration);

    function compareConfiguration($stateProvider) {

    	$stateProvider
    		.state('comparePlayers', {
    			url: '/compare/players?playerIds',
    			templateUrl: '/app/compare/comparePlayers.htm',
    			controller: 'ComparePlayersController as compare'
    		})
    		.state('compareEvents', {
                url: '/compare/events?eventIds',
                templateUrl: '/app/compare/compareEvents.htm',
                controller: 'CompareEventsController as compare'
            })
            .state('compareGames', {
                abstract: true,
                url: '/compare/games/:gameIds',
                templateUrl: '/app/compare/compareGames.htm',
                controller: 'CompareGamesController as compare'
            })
            .state('compareGames.summary', {
                url: '/summary',
                templateUrl: '/app/compare/compareGames.summary.htm'
            })
            .state('compareGames.boards', {
                url: '/boards',
                templateUrl: '/app/compare/compareGames.boards.htm'
            });

    }
    compareConfiguration.$inject = ["$stateProvider"];

})();