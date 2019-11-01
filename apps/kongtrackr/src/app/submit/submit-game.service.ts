import * as firebase from 'firebase';

/* @ngInject */
export function submitGameService(
  $q,
  $rootScope,
  $firebaseObject,
  $firebaseArray,
  eventService
) {
  var _fbRef = firebase.database().ref();

  this.checkAndSetWeights = checkAndSetWeights;
  this.createRandomId = createRandomId;
  this.expandAbbreviatedPoints = expandAbbreviatedPoints;
  this.overwriteGame = overwriteGame;
  this.submitGame = submitGame;

  ////////////////

  function camelize(inputString) {
    return inputString
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  function checkAndSetWeights() {}

  function createRandomId(): string {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 18) +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  function expandAbbreviatedPoints(inputPointsString) {
    var expansion;
    var splitString = [];

    if (inputPointsString.indexOf('.') > -1) {
      splitString = inputPointsString.split('.');
    } else if (inputPointsString.indexOf('-') > -1) {
      splitString = inputPointsString.split('-');
    } else if (inputPointsString.length <= 2) {
      return Number(inputPointsString) * 1000;
    } else {
      return Number(inputPointsString);
    }

    expansion = Number(splitString[0]) * 1000 + Number(splitString[1]) * 100;

    return Number(expansion);
  }

  function overwriteGame(inputGameProperties, inputGameId) {
    // Load the game from the database.
    var gameData = $firebaseObject(_fbRef.child('games').child(inputGameId));

    return $q(function(resolve, reject) {
      gameData.$loaded().then(function() {
        gameData.score = inputGameProperties.score;
        gameData.platform = inputGameProperties.platform;
        gameData.isKillscreen = inputGameProperties.isKillscreen;
        gameData.date = inputGameProperties.date;
        gameData.hasCompleteData = inputGameProperties.hasCompleteData;

        if (inputGameProperties.concealedDay) {
          gameData.concealedDay = true;
        }

        if (inputGameProperties.concealedMonth) {
          gameData.concealedMonth = true;
        }

        if (inputGameProperties.hasCompleteData) {
          gameData.boardScores = inputGameProperties.boardScores;
          gameData.deaths = inputGameProperties.deaths;
        }

        if (inputGameProperties.inputIsDayUnknown) {
          gameData.concealedDay = true;
        }

        if (inputGameProperties.inputIsMonthUnknown) {
          gameData.concealedMonth = true;
        }

        if (inputGameProperties.mameVersion) {
          gameData.mameVersion = inputGameProperties.mameVersion;
        }

        if (inputGameProperties.isVerified) {
          gameData.isVerified = true;

          if (inputGameProperties.tgURL) {
            gameData.tgURL = inputGameProperties.tgURL;
          }

          if (inputGameProperties.dkfURL) {
            gameData.dkfURL = inputGameProperties.dkfURL;
          }
        }

        if (inputGameProperties.event) {
          gameData.event = inputGameProperties.event;
          eventService
            .addGameIdToEvent(inputGameProperties.event, inputGameId)
            .then(function() {
              if (inputGameProperties.eventWinnings) {
                eventService.addWinningsToEvent(
                  inputGameProperties.event,
                  camelize(inputGameProperties.player),
                  inputGameProperties.eventWinnings
                );
              }

              gameData.$save();
              resolve();
            });
        } else {
          gameData.$save();
          resolve();
        }

        console.log(gameData);
      });
    });
  }

  function submitGame(inputGameProperties) {
    var gameList = $firebaseArray(_fbRef.child('games'));
    let needsNameAssignment = false;

    // Load both the gameList and playerList, then post the game.
    gameList.$loaded().then(function() {
      var newGame = inputGameProperties;

      if (newGame.mameVersion === undefined) {
        newGame.mameVersion = null;
      }

      let foundPlayerId = null;

      // Find the player id by the given player name.
      $firebaseArray(_fbRef.child('players'))
        .$loaded()
        .then(players => {
          players.forEach(player => {
            // Found the player by name. Grab the id.
            if (player.name === inputGameProperties.playerName) {
              foundPlayerId = player.$id;
              console.log({ foundPlayerId });
            }
          });

          newGame.player = inputGameProperties.playerName;
          delete newGame.playerName;

          if (foundPlayerId) {
            newGame.playerId = foundPlayerId;
          } else {
            newGame.playerId = createRandomId();
            needsNameAssignment = true;
          }

          console.log({ newGame });

          let player = $firebaseObject(
            _fbRef.child('players').child(newGame.playerId)
          );

          player.$loaded().then(() => {
            if (needsNameAssignment) {
              player.name = newGame.player;
              player.$save();
            }

            gameList.$add(newGame).then(newGameReference => {
              // Add this game to the player's array of games.
              let playerGamesArray = $firebaseArray(
                _fbRef
                  .child('players')
                  .child(newGame.playerId)
                  .child('games')
              );

              playerGamesArray.$loaded().then(() => {
                playerGamesArray.$add(newGameReference.key);

                $rootScope.$broadcast('gameAdded', {
                  gameId: newGameReference.key
                });
              });
            });
          });
        });
    });
  }
}
