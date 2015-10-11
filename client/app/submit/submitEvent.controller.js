(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .controller('SubmitEventController', SubmitEventController);

    /* @ngInject */
    function SubmitEventController($scope, submitEventService) {

        var vm = this;

        // Public Variables
        vm.eventGames = [];
        vm.inputEndDate = null;
        vm.inputEventName = null;
        vm.inputStartDate = null;
        vm.inputFormat = null;
        vm.inputOnlineOffline = null;

        // Public Functions
        vm.addAnotherGame = addAnotherGame;
        vm.handleCommit = handleCommit;

        activate();

        ////////////////

        function activate() {

            addAnotherGame();

            $scope.$on('eventAdded', function() {
                console.log(arguments[1].eventId);
                $state.go('event', { eventId: arguments[1].eventId });
            });

        }

        function addAnotherGame() {

            vm.eventGames.push({
                player: null,
                score: null,
                platform: null,
                winnings: null
            });

        }

        function handleCommit() {

            var eventPropertiesObject = {};

            eventPropertiesObject.name = vm.inputEventName;
            eventPropertiesObject.startDate = vm.inputStartDate;
            eventPropertiesObject.endDate = vm.inputEndDate;
            eventPropertiesObject.onlineOffline = vm.inputOnlineOffline;
            eventPropertiesObject.format = Number(vm.inputFormat);
            eventPropertiesObject.games = [];

            submitEventService.submitEvent(eventPropertiesObject, vm.eventGames);

        }

    }

})();