(function() {
    'use strict';

    angular
        .module('kongtrac.ranking')
        .config(rankingConfiguration);

    function rankingConfiguration($stateProvider) {

    	$stateProvider
    		.state('playerRanking', {
    			url: '/ranking/players',
    			templateUrl: 'app/ranking/ranking.players.htm',
                controller: 'RankingController as ranking'
    		})
            .state('gameRanking', {
                url: '/ranking/games',
                templateUrl: 'app/ranking/ranking.games.htm',
                controller: 'RankingController as ranking'
            });

    }
    rankingConfiguration.$inject = ["$stateProvider"];

})();