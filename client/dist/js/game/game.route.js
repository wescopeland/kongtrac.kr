(function() {
    'use strict';

    angular
        .module('kongtrac.game')
        .config(gameConfiguration);

    function gameConfiguration($stateProvider) {

    	$stateProvider
    		.state('game', {
    			abstract: true,
    			url: '/game/:gameId',
    			templateUrl: 'app/game/game.htm',
    			controller: 'GameController as game'
    		})
    		.state('game.summary', {
    			url: '/summary',
    			templateUrl: '/app/game/gameSummary.htm'
    		})
            .state('game.boards', {
                url: '/boards',
                templateUrl: '/app/game/gameBoards.htm'
            });

    }
    gameConfiguration.$inject = ["$stateProvider"];

})();