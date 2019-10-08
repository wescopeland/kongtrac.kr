/* @ngInject */
export function SubmitEventController($scope, $state, submitEventService) {
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
    var eventPropertiesObject = {} as any;

    eventPropertiesObject.name = vm.inputEventName;
    eventPropertiesObject.startDate = vm.inputStartDate;
    eventPropertiesObject.endDate = vm.inputEndDate;
    eventPropertiesObject.onlineOffline = vm.inputOnlineOffline;
    eventPropertiesObject.format = Number(vm.inputFormat);

    // If this event contains a bracket...
    if (
      eventPropertiesObject.format === 1 ||
      eventPropertiesObject.format === 2
    ) {
      eventPropertiesObject.bracketParticipantCount =
        vm.inputBracketParticipants;

      if (eventPropertiesObject.bracketParticipantCount >= 2) {
        eventPropertiesObject.ro2 = {
          players: [],
          winner: ''
        };

        eventPropertiesObject.ro2.players.push(vm.ro2Player1);
        eventPropertiesObject.ro2.players.push(vm.ro2Player2);
        eventPropertiesObject.ro2.winner = vm.ro2Winner;
      }

      if (eventPropertiesObject.bracketParticipantCount >= 4) {
        eventPropertiesObject.ro4 = {
          gameOnePlayers: [],
          gameTwoPlayers: [],
          gameOneWinner: '',
          gameTwoWinner: ''
        };

        eventPropertiesObject.ro4.gameOnePlayers.push(vm.ro4Player1);
        eventPropertiesObject.ro4.gameOnePlayers.push(vm.ro4Player2);
        eventPropertiesObject.ro4.gameTwoPlayers.push(vm.ro4Player3);
        eventPropertiesObject.ro4.gameTwoPlayers.push(vm.ro4Player4);

        eventPropertiesObject.ro4.gameOneWinner = vm.ro4Winner1;
        eventPropertiesObject.ro4.gameTwoWinner = vm.ro4Winner2;
      }

      if (eventPropertiesObject.bracketParticipantCount >= 8) {
        eventPropertiesObject.ro8 = {
          gameOnePlayers: [],
          gameTwoPlayers: [],
          gameThreePlayers: [],
          gameFourPlayers: [],
          gameOneWinner: '',
          gameTwoWinner: '',
          gameThreeWinner: '',
          gameFourWinner: ''
        };

        eventPropertiesObject.ro8.gameOnePlayers.push(vm.ro8Player1);
        eventPropertiesObject.ro8.gameOnePlayers.push(vm.ro8Player2);
        eventPropertiesObject.ro8.gameTwoPlayers.push(vm.ro8Player3);
        eventPropertiesObject.ro8.gameTwoPlayers.push(vm.ro8Player4);
        eventPropertiesObject.ro8.gameThreePlayers.push(vm.ro8Player5);
        eventPropertiesObject.ro8.gameThreePlayers.push(vm.ro8Player6);
        eventPropertiesObject.ro8.gameFourPlayers.push(vm.ro8Player7);
        eventPropertiesObject.ro8.gameFourPlayers.push(vm.ro8Player8);

        eventPropertiesObject.ro8.gameOneWinner = vm.ro8Winner1;
        eventPropertiesObject.ro8.gameTwoWinner = vm.ro8Winner2;
        eventPropertiesObject.ro8.gameThreeWinner = vm.ro8Winner3;
        eventPropertiesObject.ro8.gameFourWinner = vm.ro8Winner4;
      }

      if (eventPropertiesObject.bracketParticipantCount >= 16) {
        eventPropertiesObject.ro16 = {
          gameOnePlayers: [],
          gameTwoPlayers: [],
          gameThreePlayers: [],
          gameFourPlayers: [],
          gameFivePlayers: [],
          gameSixPlayers: [],
          gameSevenPlayers: [],
          gameEightPlayers: [],
          gameOneWinner: '',
          gameTwoWinner: '',
          gameThreeWinner: '',
          gameFourWinner: '',
          gameFiveWinner: '',
          gameSixWinner: '',
          gameSevenWinner: '',
          gameEightWinner: ''
        };

        eventPropertiesObject.ro16.gameOnePlayers.push(vm.ro16Player1);
        eventPropertiesObject.ro16.gameOnePlayers.push(vm.ro16Player2);
        eventPropertiesObject.ro16.gameTwoPlayers.push(vm.ro16Player3);
        eventPropertiesObject.ro16.gameTwoPlayers.push(vm.ro16Player4);
        eventPropertiesObject.ro16.gameThreePlayers.push(vm.ro16Player5);
        eventPropertiesObject.ro16.gameThreePlayers.push(vm.ro16Player6);
        eventPropertiesObject.ro16.gameFourPlayers.push(vm.ro16Player7);
        eventPropertiesObject.ro16.gameFourPlayers.push(vm.ro16Player8);
        eventPropertiesObject.ro16.gameFivePlayers.push(vm.ro16Player9);
        eventPropertiesObject.ro16.gameFivePlayers.push(vm.ro16Player10);
        eventPropertiesObject.ro16.gameSixPlayers.push(vm.ro16Player11);
        eventPropertiesObject.ro16.gameSixPlayers.push(vm.ro16Player12);
        eventPropertiesObject.ro16.gameSevenPlayers.push(vm.ro16Player13);
        eventPropertiesObject.ro16.gameSevenPlayers.push(vm.ro16Player14);
        eventPropertiesObject.ro16.gameEightPlayers.push(vm.ro16Player15);
        eventPropertiesObject.ro16.gameEightPlayers.push(vm.ro16Player16);

        eventPropertiesObject.ro16.gameOneWinner = vm.ro16Winner1;
        eventPropertiesObject.ro16.gameTwoWinner = vm.ro16Winner2;
        eventPropertiesObject.ro16.gameThreeWinner = vm.ro16Winner3;
        eventPropertiesObject.ro16.gameFourWinner = vm.ro16Winner4;
        eventPropertiesObject.ro16.gameFiveWinner = vm.ro16Winner5;
        eventPropertiesObject.ro16.gameSixWinner = vm.ro16Winner6;
        eventPropertiesObject.ro16.gameSevenWinner = vm.ro16Winner7;
        eventPropertiesObject.ro16.gameEightWinner = vm.ro16Winner8;
      }
    }

    submitEventService.submitEvent(eventPropertiesObject, vm.eventGames);
  }
}
