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
    function GlobalSearchController($scope, $state, $q, algolia) {

    	var vm = this;

        // Public Functions
        vm.globalSearch = globalSearch;
        vm.indexSearch = indexSearch;
        vm.uncamelize = uncamelize;
        vm.openGame = openGame;
        vm.openPlayer = openPlayer;
        vm.openEvent = openEvent;

    	// Private Variables
    	var algoliaClient = algolia.Client('NW1XKBQ46B', '6de01060732bc03eb72a54c7e19c600d');
    	vm.gamesIndex = algoliaClient.initIndex('games');
    	vm.playersIndex = algoliaClient.initIndex('players');
        vm.eventsIndex = algoliaClient.initIndex('events');

        //////////////////////////

        function openGame(inputGame) {

            vm.inputSearchQuery = '';
            $state.go('game.summary', { gameId: inputGame.objectID });

        }

        function openPlayer(inputPlayer) {

            vm.inputSearchQuery = '';
            $state.go('player', { playerName: inputPlayer.objectID });

        }

        function openEvent(inputEvent) {

            vm.inputSearchQuery = '';
            $state.go('event', { eventId: inputEvent.objectID });

        }

        function globalSearch(inputQuery) {

            return $q.all([

                indexSearch(vm.gamesIndex, inputQuery),
                indexSearch(vm.playersIndex, inputQuery),
                indexSearch(vm.eventsIndex, inputQuery)

            ]).then(function then(response) {

                var globalSearchResponse = {};
                globalSearchResponse.games = response[0];
                globalSearchResponse.players = response[1];
                globalSearchResponse.events = response[2];

                return [globalSearchResponse];

            });

        }

        function indexSearch(inputIndex, inputQuery) {

            var deferred = $q.defer();

            inputIndex.search(inputQuery, { hitsPerPage: 20 }).then(function then(response) {

                deferred.resolve(response.hits);

            }, function(failure) {

                deferred.resolve([]);

            });

            return deferred.promise;

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

        $scope.$on('$typeahead.select', function(value, index, senderInstance) {
            console.log(arguments);
        });

    }

})();