import * as angular from 'angular';

/* @ngInject */
export function PlayerController(
  $stateParams,
  $filter,
  $firebaseAuth,
  playerService,
  gameService,
  eventService
) {
  var vm = this;

  // Public Variables
  vm.inputPlayer = $stateParams.playerName;
  vm.isAuthenticated = false;
  vm.isEditing = false;
  vm.onlyShowComplete = false;
  vm.pbChartConfiguration = {};
  vm.pbHistorySeries = {};
  vm.playerData = {};
  vm.playerGameTableData = [];
  vm.playerEditData = {};

  // Public Functions
  vm.handleEditCommit = handleEditCommit;

  activate();

  ////////////////

  function activate() {
    $firebaseAuth().$onAuthStateChanged(user => {
      if (user.email) {
        vm.isAuthenticated = true;
      } else {
        vm.isAuthenticated = false;
      }
    });

    vm.displayedPlayerGameTable = [].concat(vm.playerGameTableData);

    playerService.getPlayerData(vm.inputPlayer).then(function then(response) {
      vm.playerData = response;
      vm.playerData.hasEvents = false;
      vm.playerEditData.name = response.name;

      console.log(vm.playerEditData);

      playerService
        .getPlayerGames(vm.playerData.gameIds)
        .then(function then(gamesResponse) {
          vm.playerData.gamesData = gamesResponse;

          vm.playerData.arcadeBest = playerService.getArcadeBest(
            vm.playerData.gamesData
          );

          vm.playerData.mameBest = playerService.getMAMEBest(
            vm.playerData.gamesData
          );

          vm.playerData.firstKSDate = playerService.getFirstKSDate(
            vm.playerData.gamesData
          );

          vm.playerData.firstMillionDate = playerService.getFirstMillionDate(
            vm.playerData.gamesData
          );

          vm.playerData.pbMap = playerService.buildPBMap(
            vm.playerData.gamesData
          );

          vm.pbHistorySeries = {
            data: vm.playerData.pbMap,
            name: vm.playerData.name.split(' ').pop() + ' (PB History)',
            // color: '#000000',
            lineWidth: 3,
            borderWidth: 0,
            marker: {
              enabled: true
            }
          };

          vm.playerData.gamesData.forEach(function(game) {
            var newGameTableObject = {
              date: game.date,
              score: game.score,
              platform: game.platform,
              finalBoard: game.finalBoard,
              id: game.$id
            } as any;

            if (game.event) {
              vm.playerData.hasEvents = true;

              eventService
                .getEventData(game.event)
                .then(function then(response) {
                  newGameTableObject.eventId = game.event;
                  newGameTableObject.eventName = response.name;
                  newGameTableObject.eventWinnings = response.winnings
                    ? response.winnings[camelize(vm.playerData.name)]
                    : null;
                  newGameTableObject.eventStartDate = response.startDate;
                  newGameTableObject.eventEndDate = response.endDate;
                  newGameTableObject.realEventEndDate = new Date(
                    response.endDate
                  );

                  // Was this a bracket event?
                  if (response.format === 1 || response.format === 2) {
                    newGameTableObject.eventName += ' (Score Competition)';

                    var bracketResultTableObject = angular.copy(
                      newGameTableObject
                    );
                    // TODO
                  }

                  // Find this player's position in the specified event.
                  var eventGames = [];
                  var pushedEventData = false;
                  response.games.forEach(function(gameId) {
                    gameService
                      .getGameData(gameId)
                      .then(function then(gameResponse) {
                        eventGames.push({
                          player: camelize(gameResponse.player),
                          score: gameResponse.score
                        });

                        eventGames = $filter('orderBy')(eventGames, '-score');
                        for (var i = 0; i < eventGames.length; i += 1) {
                          if (eventGames[i].player === vm.inputPlayer) {
                            newGameTableObject.eventPosition =
                              i + 1 + ' of ' + eventGames.length;
                            break;
                          }
                        }

                        if (!pushedEventData) {
                          vm.playerGameTableData.push(newGameTableObject);
                          pushedEventData = true;
                        }
                      });
                  });
                });
            } else {
              vm.playerGameTableData.push(newGameTableObject);
            }
          });
        });

      console.log(vm.playerData);
    });
  }

  function camelize(inputString) {
    return inputString
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  function handleEditCommit() {
    playerService
      .editPlayer(vm.inputPlayer, vm.playerEditData)
      .then(function() {
        vm.isEditing = false;
      });
  }
}
