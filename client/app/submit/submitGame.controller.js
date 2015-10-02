(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .controller('SubmitGameController', SubmitGameController);

    /* @ngInject */
    function SubmitGameController($scope, boardMapper, submitGameService) {

        var vm = this;

        // Public Variables
        vm.inputPlayer = '';
        vm.inputDate = '';
        vm.inputScore = undefined;
        vm.inputPlatform = '';
        vm.inputIsKillscreen = false;
        vm.inputIsDayUnknown = false;
        vm.inputIsMonthUnknown = false;
        vm.dateFormat = 'MM/dd/yyyy';
        vm.gameScoresMap = [];
        vm.deathScores = [];

        // Public Functions
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
})();