(function() {
    'use strict';

    angular
        .module('kongtrac.compare')
        .controller('CompareSelectionController', CompareSelectionController);

    /* @ngInject */
    function CompareSelectionController($scope, $state, searchService) {

        var vm = this;

        // Public Functions
        vm.addGame = addGame;
        vm.gameSearch = gameSearch;
        vm.inputGames = [];
        vm.launchGameComparison = launchGameComparison;
        vm.removeGame = removeGame;

        activate();

        ////////////////

        function activate() {

        }

        function addGame(inputGame) {
        	
        	console.log(inputGame);
        	vm.inputGames.push(inputGame);
        	vm.inputSearchQuery = '';

        }

        function gameSearch(inputQuery) {
        	return searchService.gameSearch(inputQuery);
        }

        function launchGameComparison() {

        	var gameIdsString = '';
        	for (var i = 0; i < vm.inputGames.length; i += 1) {

        		if (i !== 0) {
        			gameIdsString += '&'
        		}

        		gameIdsString += vm.inputGames[i].objectID;

        	}

        	$state.go('compareGames.summary', { gameIds: gameIdsString });

        }

        function removeGame(inputGame) {

        	for (var i = 0; i < vm.inputGames.length; i += 1) {

        		if (vm.inputGames[i].objectID === inputGame.objectID) {
        			vm.inputGames.splice(i, 1);
        			break;
        		}

        	}

        }

    }
    CompareSelectionController.$inject = ["$scope", "$state", "searchService"];
})();