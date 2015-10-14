(function() {
    'use strict';

    angular
        .module('kongtrac.compare')
        .config(compareConfiguration);

    function compareConfiguration($stateProvider) {

    	$stateProvider
            .state('compareSelection', {
                abstract: true,
                url: '/compare/selection',
                templateUrl: '/app/compare/selection.htm',
                controller: 'CompareSelectionController as compare'
            })
            .state('compareSelection.games', {
                url: '/games',
                templateUrl: '/app/compare/selection.games.htm'
            })
            .state('compareSelection.players', {
                url: '/players',
                templateUrl: '/app/compare/selection.players.htm',
            })
            .state('compareSelection.events', {
                url: '/events',
                templateUrl: '/app/compare/selection.events.htm'
            })
    		.state('comparePlayers', {
    			url: '/compare/players/:playerIds',
    			templateUrl: '/app/compare/comparePlayers.htm',
    			controller: 'ComparePlayersController as compare'
    		})
    		.state('compareEvents', {
                url: '/compare/events/:eventIds',
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
            });

    }
    compareConfiguration.$inject = ["$stateProvider"];

})();