(function() {
    'use strict';

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

        ////////////////

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
                                platform: 'Arcade'
                            });

                        }

                    });

                    responses.mamePBs.forEach(function(pb) {

                        if (pb.score !== 0) {

                            sanitizedMAME.push({
                                player: pb.playerName,
                                score: pb.score,
                                date: pb.date,
                                platform: 'MAME'
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

            /*
            return $q(function(resolve, reject) {

                var sanitizedArcade = [];
                var sanitizedMAME = [];

                inputArcadeBests.forEach(function(pb) {

                    sanitizedArcade.push({
                        player: pb.player,
                        score: pb.score,
                        date: pb.date
                    });

                });

                inputMAMEBests.forEach(function(pb) {

                    sanitizedMAME.push({
                        player: pb.player,
                        score: pb.score,
                        date: pb.date
                    });

                });

                var combinedPlatforms = sanitizedArcade + sanitizedMAME;
                resolve(combinedPlatforms);

            });
            */

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
    scoresService.$inject = ["$q", "$firebaseObject", "$firebaseArray", "$filter"];

})();