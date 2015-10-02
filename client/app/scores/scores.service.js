(function() {
    'use strict';

    angular
        .module('kongtrac.scores')
        .service('scoresService', scoresService);

    /* @ngInject */
    function scoresService($q, $firebaseObject, $firebaseArray) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
    	var _sortedPersonalBests = [];

        // Public Functions
    	this.getArcadeTopTen = getArcadeTopTen;
        this.generateCombinedTopTen = generateCombinedTopTen;
        this.getMameTopTen = getMameTopTen;

        ////////////////

        function generateCombinedTopTen() {

            var personalBests = $firebaseArray(
                _fbRef
                    .child('personalBests')
            );

            return $q(function(resolve, reject) {

                personalBests.$loaded().then(function() {

                    _sortedPersonalBests = personalBests.sort(function(a, b) {
                        return b.score - a.score;
                    });

                    resolve(_sortedPersonalBests);

                });

            });

        }

        function getArcadeTopTen() {

        	var arcadeTopTen = [];

        	_sortedPersonalBests.forEach(function(personalBest) {

        		if (personalBest.platform === 'Arcade') {
        			arcadeTopTen.push(personalBest);
        		}

        	});

        	return arcadeTopTen;

        }

        function getMameTopTen() {

        	var mameTopTen = [];

        	_sortedPersonalBests.forEach(function(personalBest) {

        		if (personalBest.platform === 'MAME') {
        			mameTopTen.push(personalBest);
        		}

        	});

        	return mameTopTen;

        }

    }
})();