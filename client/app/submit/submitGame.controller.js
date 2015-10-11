(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .controller('SubmitGameController', SubmitGameController);

    /* @ngInject */
    function SubmitGameController($scope, $state, boardMapper, submitGameService) {

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

            $scope.$on('gameAdded', function() {
                console.log(arguments[1].gameId);
                $state.go('game.summary', { gameId: arguments[1].gameId });
            });

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

            if (vm.inputIsDayUnknown && !vm.inputIsMonthUnknown) {

                gamePropertiesObject.concealedDay = true;
                
                if (gamePropertiesObject.date.indexOf('Jan') > -1) {
                    gamePropertiesObject.date = '01/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Feb') > -1) {
                    gamePropertiesObject.date = '02/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Mar') > -1) {
                    gamePropertiesObject.date = '03/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Apr') > -1) {
                    gamePropertiesObject.date = '04/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('May') > -1) {
                    gamePropertiesObject.date = '05/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Jun') > -1) {
                    gamePropertiesObject.date = '06/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Jul') > -1) {
                    gamePropertiesObject.date = '07/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Aug') > -1) {
                    gamePropertiesObject.date = '08/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Sep') > -1) {
                    gamePropertiesObject.date = '09/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Oct') > -1) {
                    gamePropertiesObject.date = '10/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Nov') > -1) {
                    gamePropertiesObject.date = '11/15/' + gamePropertiesObject.date.split(' ')[0];
                }

                if (gamePropertiesObject.date.indexOf('Dec') > -1) {
                    gamePropertiesObject.date = '12/15/' + gamePropertiesObject.date.split(' ')[0];
                }

            }

            if (vm.inputIsMonthUnknown && vm.inputIsDayUnknown) {
                gamePropertiesObject.concealedMonth = true;
                gamePropertiesObject.date = '06/06/' + gamePropertiesObject.date;
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
})();