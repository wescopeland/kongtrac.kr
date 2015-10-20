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
        vm.gameSumScoresMap = [];
        vm.gameScoresMap = [];
        vm.inputDate = '';
        vm.inputHasCompleteData = false;
        vm.inputIsDayUnknown = false;
        vm.inputIsKillscreen = false;
        vm.inputIsMonthUnknown = false;
        vm.inputPlatform = '';
        vm.inputPlayer = '';
        vm.inputScore = undefined;
        vm.laddaOn = false;
        vm.scoresInputDisplay = 'sums';

        // Public Functions
        vm.expand = expand;
        vm.getAllLevels = getAllLevels;
        vm.handleCommit = handleCommit;
        vm.mapIndividualsToSums = mapIndividualsToSums;
        vm.mapSumsToIndividuals = mapSumsToIndividuals;

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

            vm.laddaOn = true;

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
                    gamePropertiesObject.date = '01/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Feb') > -1) {
                    gamePropertiesObject.date = '02/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Mar') > -1) {
                    gamePropertiesObject.date = '03/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Apr') > -1) {
                    gamePropertiesObject.date = '04/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('May') > -1) {
                    gamePropertiesObject.date = '05/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Jun') > -1) {
                    gamePropertiesObject.date = '06/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Jul') > -1) {
                    gamePropertiesObject.date = '07/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Aug') > -1) {
                    gamePropertiesObject.date = '08/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Sep') > -1) {
                    gamePropertiesObject.date = '09/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Oct') > -1) {
                    gamePropertiesObject.date = '10/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Nov') > -1) {
                    gamePropertiesObject.date = '11/15/' + gamePropertiesObject.date.split(' ')[1];
                }

                if (gamePropertiesObject.date.indexOf('Dec') > -1) {
                    gamePropertiesObject.date = '12/15/' + gamePropertiesObject.date.split(' ')[1];
                }

            }

            if (vm.inputIsMonthUnknown && vm.inputIsDayUnknown) {
                gamePropertiesObject.concealedMonth = true;
                gamePropertiesObject.date = '06/06/' + gamePropertiesObject.date;
            }

            if (vm.inputIsVerified) {

                gamePropertiesObject.isVerified = true;
                if (vm.inputTGVerificationURL) {
                    gamePropertiesObject.tgURL = vm.inputTGVerificationURL;
                }

                if (vm.inputDKFVerificationURL) {
                    gamePropertiesObject.dkfURL = vm.inputDKFVerificationURL;
                }

            }

        	if (vm.inputHasCompleteData) {

                if (vm.scoresInputDisplay === 'sums') {
                    convertSumsToIndividuals();
                }

        		gamePropertiesObject.boardScores = vm.gameScoresMap;

        		vm.deathScores[0].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[0].board);
				vm.deathScores[1].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[1].board);
        		vm.deathScores[2].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[2].board);
        		vm.deathScores[3].board = boardMapper.mapLevelToBoardNumber(vm.deathScores[3].board);

        		gamePropertiesObject.deaths = vm.deathScores;

        	}

        	submitGameService.submitGame(gamePropertiesObject);

        }

        function convertSumsToIndividuals() {

            var currentBoardSumScore = 0;
            var previousBoardSumScore = 0;

            var sanitizedDeaths = angular.copy(vm.deathScores);
            var deathCount = 0;
            var currentDeathPoints = 0;
            sanitizedDeaths[0].board = boardMapper.mapLevelToBoardNumber(sanitizedDeaths[0].board);
            sanitizedDeaths[1].board = boardMapper.mapLevelToBoardNumber(sanitizedDeaths[1].board);
            sanitizedDeaths[2].board = boardMapper.mapLevelToBoardNumber(sanitizedDeaths[2].board);
            sanitizedDeaths[3].board = boardMapper.mapLevelToBoardNumber(sanitizedDeaths[3].board);

            for (var i = 0; i < vm.gameSumScoresMap.length; i += 1) {

                while (i === sanitizedDeaths[deathCount].board) {

                    currentDeathPoints += sanitizedDeaths[deathCount].points;
                    deathCount += 1;

                }

                currentBoardSumScore = Number(vm.gameSumScoresMap[i]);
                vm.gameScoresMap[i] = ( (currentBoardSumScore - currentDeathPoints) - previousBoardSumScore);
                previousBoardSumScore = Number(vm.gameSumScoresMap[i]);

                currentDeathPoints = 0;

            }


        }

        function mapIndividualsToSums() {

            vm.scoresInputDisplay = 'sums';

            /*
            var currentScoreSum = 0;
            for (var i = 0; i < vm.gameScoresMap.length; i += 1) {

                if (vm.gameScoresMap[i] && vm.gameScoresMap[i] !== '0' && vm.gameScoresMap[i] !== '') {

                    currentScoreSum += Number(vm.gameScoresMap[i]);
                    vm.gameSumScoresMap[i] = String(currentScoreSum);

                } else {
                    break;
                }

            }
            */

        }

        function mapSumsToIndividuals() {

            vm.scoresInputDisplay = 'individuals';

        }

    }
})();