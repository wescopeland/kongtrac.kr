(function() {
    'use strict';

    angular
        .module('kongtrac.search')
        .service('searchService', searchService);

    /* @ngInject */
    function searchService($q, $filter, algolia) {

    	// Private Variables
    	var _algoliaClient = algolia.Client('NW1XKBQ46B', '6de01060732bc03eb72a54c7e19c600d');
    	var _gamesIndex = _algoliaClient.initIndex('games');
    	var _playersIndex = _algoliaClient.initIndex('players');
        var _eventsIndex = _algoliaClient.initIndex('events');

        // Private Functions
        // -- indexSearch(inputIndex, inputQuery);

        // Public Functions
        this.playerSearch = playerSearch;
        this.gameSearch = gameSearch;
        this.eventSearch = eventSearch;

        ////////////////

        function gameSearch(inputQuery) {
        	return indexSearch(_gamesIndex, inputQuery);
        }

        function playerSearch(inputQuery) {
        	return indexSearch(_playersIndex, inputQuery);
        }

        function eventSearch(inputQuery) {
        	return indexSearch(_eventsIndex, inputQuery);
        }

        function indexSearch(inputIndex, inputQuery) {

            var deferred = $q.defer();

            inputIndex.search(inputQuery, { hitsPerPage: 40 }).then(function then(response) {

            	if (inputIndex === _gamesIndex) {

            		var sortedHits = $filter('orderBy')(response.hits, '-score');
            		sortedHits = $filter('filter')(sortedHits, {hasCompleteData: true});
            		deferred.resolve(sortedHits);

                } else if (inputIndex === _playersIndex) {

                    var sortedHits = $filter('orderBy')(response.hits, 'objectID');
                    deferred.resolve(sortedHits);

            	} else {

            		var sortedHits = $filter('orderBy')(response.hits, '-objectID');
            		deferred.resolve(sortedHits);

            	}

            }, function(failure) {

                deferred.resolve([]);

            });

            return deferred.promise;

        }

    }
})();