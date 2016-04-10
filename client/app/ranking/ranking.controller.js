(function() {
    'use strict';

    angular
        .module('kongtrac.ranking')
        .controller('RankingController', RankingController);

    /* @ngInject */
    function RankingController($scope, scoresService, dbstatsService) {

        var vm = this;

        // Public Variables
        vm.arcadeHSL = [];
        vm.dbStats = {};
        vm.HSL = [];
        vm.showSeparate = false;
        vm.topGamesLimit = 10;
        
        // Public Functions
        vm.camelize = camelize;
        vm.hideSeparateScores = hideSeparateScores;
        vm.setTopGamesLimit = setTopGamesLimit;
        vm.showSeparateScores = showSeparateScores;

        activate();

        ////////////////

        function activate() {

        	scoresService.generateCombinedHSL().then(function then(response) {

                console.log(response);

                vm.arcadeHSL = response.arcade;
                vm.mameHSL = response.mame;
                vm.HSL = response.combined;

            });

            scoresService.getTopCombinedGames().then(function then(response) {
                vm.combinedGamesHSL = response;
            });

            scoresService.getTopArcadeGames().then(function then(response) {
                vm.arcadeGamesHSL = response;
            });

            scoresService.getTopMameGames().then(function then(response) {
                vm.mameGamesHSL = response;
            });

            dbstatsService.getDbStats().then(function then(response) {
                vm.dbStats = response;
            });

        }

        function camelize(inputString) {

        	return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
			}).replace(/\s+/g, '');

        }

        function hideSeparateScores() {
        	vm.showSeparate = false;
        }

        function setTopGamesLimit(inputNewLimit) {
            vm.topGamesLimit = inputNewLimit;
        }

        function showSeparateScores() {
        	vm.showSeparate = true;
        }

    }
})();