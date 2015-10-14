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
        vm.addPlayer = addPlayer;
        vm.addEvent = addEvent;
        vm.gameSearch = gameSearch;
        vm.playerSearch = playerSearch;
        vm.inputGames = [];
        vm.inputPlayers = [];
        vm.inputEvents = [];
        vm.launchGameComparison = launchGameComparison;
        vm.launchPlayerComparison = launchPlayerComparison;
        vm.removeGame = removeGame;
        vm.removePlayer = removePlayer;
        vm.removeEvent = removeEvent;
        vm.uncamelize = uncamelize;

        activate();

        ////////////////

        function activate() {

        }

        function addGame(inputGame) {
        	
        	vm.inputGames.push(inputGame);
        	vm.inputSearchQuery = '';

        }

        function addPlayer(inputPlayer) {

        	vm.inputPlayers.push(inputPlayer);
        	vm.inputSearchQuery = '';

        }

        function addEvent(inputEvent) {

        	vm.inputEvents.push(inputEvent);
        	vm.inputSearchQuery = '';

        }

        function gameSearch(inputQuery) {
        	return searchService.gameSearch(inputQuery);
        }

        function playerSearch(inputQuery) {
        	return searchService.playerSearch(inputQuery);
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

        function launchPlayerComparison() {

        	var playerIdsString = '';
        	for (var i = 0; i < vm.inputPlayers.length; i += 1) {

        		if (i !== 0) {
        			playerIdsString += '&'
        		}

        		playerIdsString += vm.inputPlayers[i].objectID;

        	}

        	$state.go('comparePlayers', { playerIds: playerIdsString });

        }

        function removeGame(inputGame) {

        	for (var i = 0; i < vm.inputGames.length; i += 1) {

        		if (vm.inputGames[i].objectID === inputGame.objectID) {
        			vm.inputGames.splice(i, 1);
        			break;
        		}

        	}

        }

        function removePlayer(inputPlayer) {

        	for (var i = 0; i < vm.inputPlayers.length; i += 1) {

        		if (vm.inputPlayers[i].objectID === inputPlayer.objectID) {
        			vm.inputPlayers.splice(i, 1);
        			break;
        		}

        	}

        }

        function removeEvent(inputEvent) {

        	for (var i = 0; i < vm.inputPlayers.length; i += 1) {

        		if (vm.inputEvents[i].objectID === inputEvent.objectID) {
        			vm.inputEvents.splice(i, 1);
        			break;
        		}

        	}

        }

        function uncamelize(inputString) {

        	var separator = ' ';

        	// Assume separator is _ if no one has been provided.
			if(typeof(separator) == "undefined") {
			  separator = "_";
			}
		
			// Replace all capital letters by separator followed by lowercase one
			var text = inputString.replace(/[A-Z]/g, function (letter) {
			  return separator + letter.toUpperCase();
			});

			text = text[0].toUpperCase() + text.slice(1);
		
			// Remove first separator (to avoid _hello_world name)
			return text.replace("/^" + separator + "/", '');

        }

    }

})();