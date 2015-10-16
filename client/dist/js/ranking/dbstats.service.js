(function() {
    'use strict';

    angular
        .module('kongtrac.ranking')
        .service('dbstatsService', dbstatsService);

    /* @ngInject */
    function dbstatsService($firebaseObject, $q) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');

        this.getDbStats = getDbStats;

        ////////////////

        function getDbStats() {

        	return $q(function(resolve, reject) {

        		var dbStatsData = $firebaseObject(
            		_fbRef
            			.child('dbStats')
            	);

        		dbStatsData.$loaded().then(function() {

        			console.log(dbStatsData);
        			resolve(dbStatsData);

        		});

        	});

        }

    }
    dbstatsService.$inject = ["$firebaseObject", "$q"];

})();