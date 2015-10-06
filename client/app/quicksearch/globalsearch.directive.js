(function() {
    'use strict';

    angular
        .module('kongtrac.search')
        .directive('globalSearch', globalSearch);

    /* @ngInject */
    function globalSearch() {
        var directive = {
            bindToController: true,
            controller: GlobalSearchController,
            controllerAs: 'vm',
            templateUrl: './app/quicksearch/globalsearch.template.html',
            restrict: 'E',
            scope: {
            }
        };
        return directive;
    }

    /* @ngInject */
    function GlobalSearchController($q, algolia) {

    	var vm = this;

    	// Public Variables
    	vm.inputSearchQuery = '';
    	vm.hits = [];

    	vm.testData = ['Test1', 'Test2', 'Test3'];

    	// Public Functions
    	vm.makeQuickSearch = makeQuickSearch;

    	// Private Variables
    	var algoliaClient = algolia.Client('NW1XKBQ46B', '6de01060732bc03eb72a54c7e19c600d');
    	var gamesIndex = algoliaClient.initIndex('games');
    	var playersIndex = algoliaClient.initIndex('players');

    	function makeQuickSearch(inputQuery) {

    		return $q(function(resolve, reject) {

    			$q.all([

	    			makeGamesSearch(inputQuery)

	    		]).then(function(gamesResponse) {

	    			resolve(gamesResponse);

	    		});

    		});

    		

    	}

    	function makeGamesSearch(inputQuery) {

    		return $q(function(resolve, reject) {

    			gamesIndex.search(inputQuery).then(function searchSuccess(content) {

    				var returnHits = [];
    				content.hits.forEach(function(hit) {
    					returnHits.push(hit);
    				});

    				resolve(returnHits);

    			}, function searchFailure(err) {
    				reject(err);
    			});

    		})

    	}

    }

})();