(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .controller('SubmitGameController', SubmitGameController);

    /* @ngInject */
    function SubmitGameController($scope, boardMapper, submitGameService) {

        var vm = this;

        // Public Variables
        vm.dateFormat = 'MM/dd/yyyy';
        vm.deathScores = [];
        vm.gameScoresMap = [];
        vm.inputDate = '';
        vm.inputHasCompleteData = false;
        vm.inputIsDayUnknown = false;
        vm.inputIsKillscreen = false;
        vm.inputIsMonthUnknown = false;
        vm.inputPlatform = '';
        vm.inputPlayer = '';
        vm.inputScore = undefined;

        // Public Functions
        vm.expand = expand;
        vm.getAllLevels = getAllLevels;
        vm.handleCommit = handleCommit;

        activate();

        ////////////////

        function activate() {

        	vm.spreadsheetSettings = {
        		contextMenu: [
        			'row_above', 'row_below', 'remove_row'
        		]
        	};

        }

        function expand(inputPoints) {
            return submitGameService.expandAbbreviatedPoints(inputPoints);
        }

        function getAllLevels() {
        	return boardMapper.getAllLevels();
        }

        function handleCommit() {

        	var gamePropertiesObject = {};

        	gamePropertiesObject.player = vm.inputPlayer;
        	gamePropertiesObject.date = vm.inputDate;
        	gamePropertiesObject.score = Number(vm.inputScore);
        	gamePropertiesObject.platform = vm.inputPlatform;
        	gamePropertiesObject.isKillscreen = vm.inputIsKillscreen;
            gamePropertiesObject.hasCompleteData = vm.inputHasCompleteData;

            if (vm.inputIsDayUnknown) {
                gamePropertiesObject.concealedDay = true;
            }

            if (vm.inputIsMonthUnknown) {
                gamePropertiesObject.concealedMonth = true;
            }

        	if (vm.inputHasCompleteData) {

        		gamePropertiesObject.boardScores = vm.gameScoresMap;

        		vm.deathScores[0].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[0].board);
				vm.deathScores[1].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[1].board);
        		vm.deathScores[2].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[2].board);
        		vm.deathScores[3].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[3].board);

        		gamePropertiesObject.deaths = vm.deathScores;

        	}

        	submitGameService.submitGame(gamePropertiesObject);

        }

    }
    SubmitGameController.$inject = ["$scope", "boardMapper", "submitGameService"];
})();