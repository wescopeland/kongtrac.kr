import * as firebase from 'firebase';
import moment from 'moment';

/* @ngInject */
export function scoresService($q, $firebaseArray, $filter) {
  var _fbRef = firebase.database().ref();
  var _sortedPersonalBests = [];

  // Public Functions
  this.getArcadePersonalBests = getArcadePersonalBests;
  this.generateCombinedHSL = generateCombinedHSL;
  this.getMamePersonalBests = getMamePersonalBests;
  this.getTopCombinedGames = getTopCombinedGames;
  this.getTopArcadeGames = getTopArcadeGames;
  this.getTopMameGames = getTopMameGames;

  ////////////////

  function getTopCombinedGames() {
    return $q(function(resolve, reject) {
      var topCombinedGames = $firebaseArray(_fbRef.child('topGamesCombined'));
      topCombinedGames.$loaded().then(function() {
        resolve(topCombinedGames);
      });
    });
  }

  function getTopArcadeGames() {
    return $q(function(resolve, reject) {
      var games = $firebaseArray(_fbRef.child('topGamesArcade'));
      games.$loaded().then(function() {
        resolve(games);
      });
    });
  }

  function getTopMameGames() {
    return $q(function(resolve, reject) {
      var games = $firebaseArray(_fbRef.child('topGamesMame'));
      games.$loaded().then(function() {
        resolve(games);
      });
    });
  }

  function generateCombinedHSL() {
    var pbPromises = {
      arcadePBs: getArcadePersonalBests(),
      mamePBs: getMamePersonalBests()
    };

    return $q(function(resolve, reject) {
      $q.all(pbPromises).then(function(responses) {
        var sanitizedArcade = [];
        var sanitizedMAME = [];

        responses.arcadePBs.forEach(function(pb) {
          if (pb.score !== 0) {
            sanitizedArcade.push({
              player: pb.playerName,
              score: pb.score,
              date: moment(pb.date),
              platform: 'Arcade',
              id: pb.id
            });
          }
        });

        responses.mamePBs.forEach(function(pb) {
          if (pb.score !== 0) {
            sanitizedMAME.push({
              player: pb.playerName,
              score: pb.score,
              date: moment(pb.date),
              platform: 'MAME',
              id: pb.id
            });
          }
        });

        var combinedPlatforms = sanitizedArcade.concat(sanitizedMAME);
        combinedPlatforms = $filter('orderBy')(combinedPlatforms, '-score');

        var hsl = {
          arcade: sanitizedArcade,
          mame: sanitizedMAME,
          combined: combinedPlatforms
        };

        resolve(hsl);
      });
    });
  }

  function getArcadePersonalBests() {
    return $q(function(resolve, reject) {
      var arcadePersonalBests = $firebaseArray(
        _fbRef.child('arcadePersonalBests')
      );
      arcadePersonalBests.$loaded().then(function() {
        resolve(arcadePersonalBests);
      });
    });
  }

  function getMamePersonalBests() {
    return $q(function(resolve, reject) {
      var mamePersonalBests = $firebaseArray(_fbRef.child('mamePersonalBests'));
      mamePersonalBests.$loaded().then(function() {
        resolve(mamePersonalBests);
      });
    });
  }
}
