'use strict';

const Firebase = require('firebase');

const db = Firebase.database();
let _gamesRef = db.ref('games');
let _playersRef = db.ref('players');

let buildPersonalBests = function() {
  _gamesRef.once('value', gamesSnapshot => {
    _playersRef.once('value', playersSnapshot => {
      const players = playersSnapshot.val();

      for (let playerId in players) {
        // Grab all of each player's games.
        let playerGames = [];
        gamesSnapshot.forEach(game => {
          let gameData = game.val();
          let gamePlayerId = null;

          if (gameData.playerId) {
            gamePlayerId = gameData.playerId;
          } else {
            gamePlayerId = camelize(gameData.player);
          }

          if (gamePlayerId === playerId) {
            playerGames.push({
              data: gameData,
              key: game.key
            });
          }
        });

        let currentArcadePbDate = null;
        let currentArcadePbGameId = null;
        let currentArcadePbScore = 0;
        let currentMamePbDate = null;
        let currentMamePbGameId = null;
        let currentMamePbScore = 0;

        playerGames.forEach(playerGame => {
          if (
            playerGame.data.platform !== 'MAME' &&
            playerGame.data.score > currentArcadePbScore
          ) {
            currentArcadePbScore = playerGame.data.score;
            currentArcadePbDate = playerGame.data.date;
            currentArcadePbGameId = playerGame.key;
          }

          if (
            playerGame.data.platform === 'MAME' &&
            playerGame.data.score > currentMamePbScore
          ) {
            currentMamePbScore = playerGame.data.score;
            currentMamePbDate = playerGame.data.date;
            currentMamePbGameId = playerGame.key;
          }
        });

        _playersRef.child(playerId).update({
          currentArcadePbDate,
          currentArcadePbScore,
          currentArcadePbGameId,
          currentMamePbDate,
          currentMamePbScore,
          currentMamePbGameId
        });
      }

      console.log('Updated personal best records for players.');
    });
  });
};

function camelize(inputString) {
  if (inputString) {
    return inputString
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}

function uncamelize(inputString) {
  var separator = ' ';

  // Assume separator is _ if no one has been provided.
  if (typeof separator == 'undefined') {
    separator = '_';
  }

  // Replace all capital letters by separator followed by lowercase one
  var text = inputString.replace(/[A-Z]/g, function(letter) {
    return separator + letter.toUpperCase();
  });

  text = text[0].toUpperCase() + text.slice(1);

  // Remove first separator (to avoid _hello_world name)
  return text.replace('/^' + separator + '/', '');
}

module.exports.build = function() {
  return buildPersonalBests();
};
