(function() {
    'use strict';

    scoresService.$inject = ["$q", "$firebaseObject", "$firebaseArray", "$filter"];
    angular
        .module('kongtrac.scores')
        .service('scoresService', scoresService);

    /* @ngInject */
    function scoresService($q, $firebaseObject, $firebaseArray, $filter) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
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
                                date: pb.date,
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
                                date: pb.date,
                                platform: 'MAME',
                                id: pb.id
                            });

                        }

                    });

                    var combinedPlatforms = sanitizedArcade.concat(sanitizedMAME);
                    combinedPlatforms = $filter('orderBy')(combinedPlatforms, '-score');

                    var knownPlayers = [];
                    for (var i = 0; i < combinedPlatforms.length; i += 1) {

                        if (knownPlayers.indexOf(combinedPlatforms[i].player) > -1) {

                            combinedPlatforms.splice(i, 1);
                            i -= 1;

                        } else {
                            knownPlayers.push(combinedPlatforms[i].player);
                        }

                    }

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

                var arcadePersonalBests = $firebaseArray(_fbRef.child('arcadePersonalBests'));
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

        function uncamelize(inputString) {

            var separator = ' ';

            // Assume separator is _ if no one has been provided.
            if(typeof(separator) == "undefined") {
              separator = "_";
            }
        
            // Replace all capital letters by separator followed by lowercase one
            var text = inputString.replace(/[A-Z]/g, function (letter) {
              return separator + letter.toUpperCase();
            });

            text = text[0].toUpperCase() + text.slice(1);
        
            // Remove first separator (to avoid _hello_world name)
            return text.replace("/^" + separator + "/", '');

        }

    }

})();